import {
	Button,
	Card,
	Col,
	Table,
	Row,
	Collapse as BootstrapCollapse,
	Modal,
} from 'react-bootstrap'

// css
import 'react-bootstrap-typeahead/css/Typeahead.css'
import 'rsuite/dist/rsuite-no-reset.min.css'




// components
import { FormInput} from '@/components'
import { PageBreadcrumb } from '@/components'
import {  useState } from 'react'
import { DateRangePicker } from 'rsuite'
import {
	useCreateAuthorMutation,
	useGetAllAuthorQuery,
	useUpdateAuthorMutation,
} from '@/api/authorSlice'
import { useToggle } from '@/hooks'

import { toast } from 'react-toastify'



const Authors = () => {
	const [isOpen, setIsOpen] = useState<boolean>(true)
	const [isStandardOpen, toggleStandard] = useToggle()

	const [firstName, setFirstName] = useState<String>('')
	const [id, setId] = useState<String>('')
	const [lastName, setLastName] = useState<String>('')
	const [nationality, setNationality] = useState<String>('')
	const [description, setDescription] = useState<String>('')
	const [firstPublishDate, setFirstPublishDate] = useState<String>('')
	const [phone, setPhone] = useState<String>('')
	const [died, setDied] = useState<String>('')
	const [password, setPassword] = useState<String>('')
	const [profileImage, setProfileImage] = useState<File | null>(null)
	const [typeUpdate, setTypeUpdate] = useState<Boolean>()

	const [createAuthor] = useCreateAuthorMutation()
	const { data, isLoading, refetch } = useGetAllAuthorQuery(undefined)
	const [updateAuthor] = useUpdateAuthorMutation()

	const toggle = () => setIsOpen(!isOpen)

	const CreateAuthor = async () => {
		try {
			const formData = new FormData()
				formData.append('firstname', firstName)
				formData.append('lastname', lastName)
				formData.append('nationality', nationality)
				formData.append('description', description)
				formData.append('phone', phone)
				formData.append('died', died)
				formData.append('password', password)
				formData.append('firstPublishDate', firstPublishDate)

				if (profileImage) {
					formData.append('profileImage', profileImage)
				} else {
					toast.error('Please add profile image')
					return
				}

			
			if (typeUpdate) {
				 const res = await updateAuthor({formData,id}).unwrap()
				if (res.message == 'Author updated') {
					toast.success('Author updated')
				}
			} else {
				
				const res = await createAuthor(formData).unwrap()
				if (res.message == 'Author Created') {
					toast.success('Author created')
				}
			}
		} catch (error) {
			toast.error('Something went wrong!')
		}
		toggleStandard()
		refetch()
	}

	const createAuthorModel = () => {
		setTypeUpdate(false)
		toggleStandard()
		setFirstName('')
		setLastName('')
		setNationality('')
		setDescription('')
		setPhone('')
		setDied('')
		setPassword('')
		setFirstPublishDate('')
		setProfileImage(null)
		setId('')

	}

	const updateAuthorModel = (record:any) => {
		setTypeUpdate(true)
		toggleStandard()
		console.log(record.record)
		setFirstName(record.record.firstname)
		setLastName(record.record.lastname)
		setNationality(record.record.nationality)
		setDescription(record.record.description)
		setPhone(record.record.phone)
		setDied(record.record.died)
		setPassword(record.record.password)
		setFirstPublishDate(record.record.firstPublishDate)
		setId(record.record._id)
	}
	console.log(typeUpdate)

	return (
		<>
			<PageBreadcrumb title="Authors List" subName="Authors" />
			<Modal show={isStandardOpen} onHide={toggleStandard}>
				<Modal.Header onHide={toggleStandard} closeButton>
					<Modal.Title as="h4">Modal Heading</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<FormInput
						label="Profile Pic"
						type="file"
						name="file"
						containerClass="mb-3"
						onChange={(e) => setProfileImage(e.target?.files?.[0] || null)}
					/>
					<FormInput
						label="First Name"
						type="text"
						name="firstName"
						defaultValue={`${firstName}`}
						containerClass="mb-3"
						onChange={(e) => setFirstName(e.target.value)}
					/>
					<FormInput
						label="Last Name"
						type="text"
						name="lastName"
						defaultValue={`${lastName}`}
						containerClass="mb-3"
						onChange={(e) => setLastName(e.target.value)}
					/>
					<FormInput
						label="Nationality"
						type="text"
						defaultValue={`${nationality}`}
						name="nic"
						containerClass="mb-3"
						onChange={(e) => setNationality(e.target.value)}
					/>
					<FormInput
						label="Address"
						type="text"
						name="address"
						defaultValue={`${description}`}
						containerClass="mb-3"
						onChange={(e) => setDescription(e.target.value)}
					/>
					<FormInput
						label="Contact Number"
						type="text"
						name="contactNumber"
						defaultValue={`${phone}`}
						containerClass="mb-3"
						onChange={(e) => setPhone(e.target.value)}
					/>
					<FormInput
						label="FirstPublishDate"
						type="date"
						defaultValue={`${firstPublishDate}`}
						name="FirstPublishDate"
						containerClass="mb-3"
						onChange={(e) => setFirstPublishDate(e.target.value)}
					/>
					<FormInput
						label="died"
						type="text"
						name="text"
						defaultValue={`${died}`}
						containerClass="mb-3"
						onChange={(e) => setDied(e.target.value)}
					/>
					<FormInput
						label="Password"
						type="text"
						defaultValue={`${password}`}
						name="text"
						containerClass="mb-3"
						key="text"
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="light" onClick={toggleStandard}>
						Close
					</Button>
					{!typeUpdate ? (
						<Button variant="primary" onClick={CreateAuthor}>
							Save changes
						</Button>
					) : (
						<Button variant="primary" onClick={CreateAuthor}>
							Update
						</Button>
					)}
				</Modal.Footer>
			</Modal>
			<Row>
				<Col>
					<Card>
						<Card.Header>
							<div className="my-2 d-flex justify-content-between">
								<Button className="btn-outline-purple" onClick={toggle}>
									<i className="ri-equalizer-line me-1" /> Filter
								</Button>
								<Button variant="info" onClick={createAuthorModel}>
									<i className="bi bi-plus-lg" /> <span>Add Author</span>
								</Button>
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
							{!isLoading && (
								<Table className="table-centered mb-0">
									<thead>
										<tr>
											<th>Sr No</th>
											<th>firstname</th>
											<th>lastname</th>
											<th>died</th>
											<th>firstPublishDate</th>
											<th>nationality</th>
											<th>income</th>
											<th>Action</th>
										</tr>
									</thead>
									<tbody>
										{(data || []).map((record: any, idx: number) => {
											return (
												<tr key={idx}>
													<td>{idx + 1}</td>
													<td>{record.firstname}</td>
													<td>{record.lastname}</td>
													<td>{record.died}</td>
													<td>{record.firstPublishDate}</td>
													<td>{record.nationality}</td>
													<td>{record.income}</td>
													<td className="d-flex flex-column"></td>
													<td>
														<Button
															variant="light"
															onClick={() => {
																updateAuthorModel({record})
															}}>
															<i className="ri-heart-line" />
														</Button>

														{/* <Button
															className="ms-1"
															onClick={() => categoryDelete(record._id)}
															variant="danger">
															<i className="ri-heart-line" />
														</Button> */}
													</td>
												</tr>
											)
										})}
									</tbody>
								</Table>
							)}
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default Authors
