import {
	Button,
	Card,
	Col,
	Row,
	Collapse as BootstrapCollapse,
	Form,
	Modal,
	Table,
} from 'react-bootstrap'

// css
import 'react-bootstrap-typeahead/css/Typeahead.css'
import 'rsuite/dist/rsuite-no-reset.min.css'

// components
import { FormInput } from '@/components'
import { PageBreadcrumb } from '@/components'
import { useState } from 'react'
import { DateRangePicker } from 'rsuite'
import { useToggle } from '@/hooks'
import {
	useCategoryAllGetQuery,
	useCategoryCreateMutation,
	useSubCategoryAllGetQuery,
	useSubCategoryCreateMutation,
} from '@/api/categorySlice'
import { toast } from 'react-toastify'

const Categories = () => {
	const [category, setCategory] = useState<String>()
	const [subCategory, setSubCategory] = useState<String>()
	const [categoryId, setCategoryId] = useState<String>()
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const toggle = () => setIsOpen(!isOpen)

	const { data: CategoryAll, refetch: categoryRefetch,isLoading: categoryLoading } =
		useCategoryAllGetQuery(undefined)
	const [categoryCreate] = useCategoryCreateMutation()
	const [subCategoryAdd] = useSubCategoryCreateMutation()
	const [subCategoryModalOpen, setSubCategoryModalOpen] =
		useState<boolean>(false)
	const { data: SubCategoryAll ,refetch: subCategoryRefetch } = useSubCategoryAllGetQuery(undefined)
	const [isStandardOpen, toggleStandard] = useToggle()

	console.log(SubCategoryAll)
	const categorySave = async () => {
		if (!category) {
			toast.error('Please enter category name')
			return
		}
		try {
			const res = await categoryCreate({ name: category }).unwrap()
			if (res.data.message == 'Category Created') {
				toast.success('Category Created!')
			}
		} catch (err) {
			console.log(err)
			toast.error('Something went wrong!')
		}
		toggleStandard()
		categoryRefetch()
		await subCategoryRefetch()
		await setCategory('')
	}
	const subCategorySave = async () => {
		if (!subCategory) {
			toast.error('Please enter sub category name')
			return
		}
		try {
			const res = await subCategoryAdd({
				name: subCategory,
				parentCategory: categoryId,
			}).unwrap()
			if (res?.message == 'Sub Category Created') {
				toast.success('Sub Category Created!')
			}
		} catch (err) {
			console.log(err)
			toast.error('Something went wrong!')
		}
		setSubCategoryModalOpen(false)
		setSubCategory('')
		setCategoryId('')
		await categoryRefetch()
		await subCategoryRefetch()
	}

	return (
		<>
			{/*  category modal  */}
			<Modal show={isStandardOpen} onHide={toggleStandard}>
				<Modal.Header onHide={toggleStandard} closeButton>
					<Modal.Title as="h4">Add New Category</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<FormInput
						label="Category Name"
						type="text"
						name="categoryName"
						containerClass="mb-3"
						key="text"
						onChange={(e) => setCategory(e.target.value)}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="light" onClick={toggleStandard}>
						Close
					</Button>
					<Button variant="primary" onClick={categorySave}>
						Create
					</Button>
				</Modal.Footer>
			</Modal>
			{/*  category modal end */}
			{/* Sub category modal  */}
			<Modal show={subCategoryModalOpen}>
				<Modal.Header>
					<Modal.Title as="h4">Add New Sub Category</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<h6 className="fs-15 mt-3">Category</h6>
					{!categoryLoading ? (
						<Form.Select
							aria-label="Floating label select example"
							onChange={(e) => setCategoryId(e.target.value)}>
							{CategoryAll.map((category: any) => (
								<option value={category._id}>{category.name}</option>
							))}
						</Form.Select>
					) : (
						''
					)}

					<FormInput
						label="Sub Category Name"
						type="text"
						name="categoryName"
						containerClass="mb-3"
						key="text"
						onChange={(e) => setSubCategory(e.target.value)}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="light"
						onClick={() => setSubCategoryModalOpen(false)}>
						Close
					</Button>
					<Button variant="primary" onClick={subCategorySave}>
						Create
					</Button>
				</Modal.Footer>
			</Modal>
			{/* Sub category modal end */}
			<PageBreadcrumb title="Categories" subName="Tables" />
			<Row>
				<Col>
					<Card>
						<Card.Header>
							<div className="my-2 d-flex justify-content-between">
								<Button className="btn-outline-purple" onClick={toggle}>
									<i className="ri-equalizer-line me-1" /> Filter
								</Button>
								<div className="d-flex gap-1">
									<Button variant="info" onClick={toggleStandard}>
										<i className="ri-server-line me-1" />{' '}
										<span>Add Category</span>
									</Button>
									<Button
										variant="info"
										onClick={() =>
											setSubCategoryModalOpen(!subCategoryModalOpen)
										}>
										<i className="ri-server-line me-1" />{' '}
										<span>Add Sub Category</span>
									</Button>
								</div>
							</div>
						</Card.Header>
						<Card.Body>
							<BootstrapCollapse in={isOpen}>
								<div>
									<Row>
										<Col lg={4}>
											<FormInput
												label="Search Name"
												type="text"
												name="text"
												containerClass="mb-3"
												key="text"
											/>
										</Col>

										<Col lg={4}>
											<div className="mb-3">
												<label className="form-label d-block">Date Range</label>
												<DateRangePicker
													className="w-100"
													appearance="default"
													defaultValue={[new Date(), new Date()]}
												/>
											</div>
										</Col>
									</Row>
								</div>
							</BootstrapCollapse>
						</Card.Body>

						<Card.Body>
							{!categoryLoading ? (
								<Table className="table-centered mb-0">
									<thead>
										<tr>
											<th>Sr No</th>
											<th>Materials</th>
											<th>Category</th>
											<th>Sub Category</th>
											<th>Action</th>
										</tr>
									</thead>
									<tbody>
										{(CategoryAll || []).map((record: any, idx: number) => {
											return (
												<tr key={idx}>
													<td>{idx + 1}</td>
													<td>{record.library}</td>
													<td>{record.name}</td>
													<td className="d-flex flex-column">
														{(SubCategoryAll || []).map(
															(sub: any) =>
																record._id === sub.parentCategory && (
																	<div key={sub._id}>{sub.name}</div>
																)
														)}
													</td>
													<td>delete</td>
												</tr>
											)
										})}	
									</tbody>
								</Table>
							) : (
								''
							)}
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default Categories
