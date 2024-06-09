import {
	Button,
	Card,
	Col,
	Row,
	Collapse as BootstrapCollapse,
	Form,
	Modal,
} from 'react-bootstrap'

// css
import 'react-bootstrap-typeahead/css/Typeahead.css'
import 'rsuite/dist/rsuite-no-reset.min.css'

//dummy data
import { employeeRecords } from './data'
import { Column } from 'react-table'
import { Employee } from './types'

// components
import { FormInput, PageSize, Table } from '@/components'
import { PageBreadcrumb } from '@/components'
import { useState } from 'react'
import { DateRangePicker } from 'rsuite'
import { useToggle } from '@/hooks'

const columns: ReadonlyArray<Column> = [
	{
		Header: 'Sr No',
		accessor: 'srNo',
		defaultCanSort: true,
	},
	{
		Header: 'Materials',
		accessor: 'name',
		defaultCanSort: true,
	},
	{
		Header: 'Category',
		accessor: 'category',
		defaultCanSort: false,
	},
	{
		Header: 'Sub Category',
		accessor: 'subcategory',
		defaultCanSort: true,
	},
	{
		Header: 'Action',
		accessor: 'action',
		defaultCanSort: false,
	},
]

const sizePerPageList: PageSize[] = [
	{
		text: '5',
		value: 5,
	},
	{
		text: '10',
		value: 10,
	},
	{
		text: '25',
		value: 25,
	},
	{
		text: 'All',
		value: employeeRecords.length,
	},
]

const Categories = () => {
	const [subCategoryModalOpen, setSubCategoryModalOpen] =
		useState<boolean>(false)
	const [isStandardOpen, toggleStandard] = useToggle()

	const [isOpen, setIsOpen] = useState<boolean>(false)
	const toggle = () => setIsOpen(!isOpen)
	console.log(isStandardOpen)
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
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="light" onClick={toggleStandard}>
						Close
					</Button>
					<Button variant="primary" onClick={toggleStandard}>
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
					<Form.Select aria-label="Floating label select example">
						<option defaultValue="selected">Active</option>
						<option defaultValue="2">Inactive</option>
					</Form.Select>
					<FormInput
						label="Category Name"
						type="text"
						name="categoryName"
						containerClass="mb-3"
						key="text"
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="light"
						onClick={() => setSubCategoryModalOpen(false)}>
						Close
					</Button>
					<Button
						variant="primary"
						onClick={() => setSubCategoryModalOpen(false)}>
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
							<Table<Employee>
								columns={columns}
								data={employeeRecords}
								pageSize={5}
								sizePerPageList={sizePerPageList}
								isSortable={true}
								pagination={true}
							/>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default Categories
