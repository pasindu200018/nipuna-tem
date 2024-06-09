import {
	Button,
	Card,
	Col,
	Row,
	Collapse as BootstrapCollapse,
	Modal,
	Form,
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
import {  useToggle } from '@/hooks'

const columns: ReadonlyArray<Column> = [
	{
		Header: 'Sr No',
		accessor: 'srNo',
		defaultCanSort: true,
	},
	{
		Header: 'CreateDate',
		accessor: 'createDate',
		defaultCanSort: true,
	},
	{
		Header: 'Name',
		accessor: 'name',
		defaultCanSort: false,
	},
	{
		Header: 'NIC',
		accessor: 'nic',
		defaultCanSort: true,
	},
	{
		Header: 'Contact No',
		accessor: 'contactNo',
		defaultCanSort: false,
	},
	{
		Header: 'Email',
		accessor: 'email',
		defaultCanSort: false,
	},
	{
		Header: 'Menu Access',
		accessor: 'menuAccess',
		defaultCanSort: false,
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

const Librarians = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const toggle = () => setIsOpen(!isOpen)
	const [isStandardOpen, toggleStandard] = useToggle()

	return (
		<>
			<Modal show={isStandardOpen} onHide={toggleStandard}>
				<Modal.Header onHide={toggleStandard} closeButton>
					<Modal.Title as="h4">Add New Reader</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<FormInput
						label="First Name"
						type="text"
						name="firstName"
						containerClass="mb-3"
						// register={register}
						key="text"
						// errors={errors}
						// control={control}
					/>
					<FormInput
						label="Last Name"
						type="text"
						name="lastName"
						containerClass="mb-3"
						// register={register}
						key="text"
						// errors={errors}
						// control={control}
					/>
					<FormInput
						label="NIC"
						type="text"
						name="nic"
						containerClass="mb-3"
						// register={register}
						key="text"
						// errors={errors}
						// control={control}
					/>
					<FormInput
						label="Address"
						type="text"
						name="address"
						containerClass="mb-3"
						// register={register}
						key="text"
						// errors={errors}
						// control={control}
					/>
					<FormInput
						label="Contact Number"
						type="text"
						name="contactNumber"
						containerClass="mb-3"
						// register={register}
						key="text"
						// errors={errors}
						// control={control}
					/>
					<FormInput
						label="Email"
						type="text"
						name="text"
						containerClass="mb-3"
						// register={register}
						key="text"
						// errors={errors}
						// control={control}
					/>
					<FormInput
						label="Password"
						type="password"
						name="text"
						containerClass="mb-3"
						// register={register}
						key="text"
						// errors={errors}
						// control={control}
					/>
					<h6 className="fs-15 mt-3">Status</h6>
					<Form.Select aria-label="Floating label select example">
						<option defaultValue="selected">Active</option>
						<option defaultValue="2">Inactive</option>
					</Form.Select>
					<h6 className="fs-15 mt-3">Library Access Type</h6>
					<Form.Select aria-label="Floating label select example">
						<option defaultValue="selected">Sinhala</option>
						<option defaultValue="2">English</option>
					</Form.Select>
					<h6 className="fs-15 mt-3">Inline</h6>
					<div className="mt-2 ">
						<Form.Check
							className="form-check-inline m-2"
							id="customCheck3"
							label="Users"
						/>
						<Form.Check
							className="form-check-inline m-2"
							id="Readers"
							label="Readers"
						/>
						<Form.Check
							className="form-check-inline m-2"
							id="Readers"
							label="Categories"
						/>
						<Form.Check
							className="form-check-inline m-2"
							id="Readers"
							label="Books"
						/>
						<Form.Check
							className="form-check-inline m-2"
							id="Readers"
							label="Authors"
						/>
						<Form.Check
							className="form-check-inline m-2"
							id="Readers"
							label="Statics"
						/>
						<Form.Check
							className="form-check-inline m-2"
							id="Readers"
							label="Sales"
						/>
						<Form.Check
							className="form-check-inline m-2"
							id="Readers"
							label="Packages"
						/>
						<Form.Check
							className="form-check-inline m-2"
							id="Readers"
							label="Notifications"
						/>
						<Form.Check
							className="form-check-inline m-2"
							id="Readers"
							label="Settings"
						/>
						<Form.Check
							className="form-check-inline m-2"
							id="Readers"
							label="Shop"
						/>
						<Form.Check
							className="form-check-inline m-2"
							id="Readers"
							label="Payment"
						/>
						<Form.Check
							className="form-check-inline m-2"
							id="Readers"
							label="Librarians"
						/>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="light" onClick={toggleStandard}>
						Close
					</Button>
					<Button variant="primary" onClick={toggleStandard}>
						Create Librarian
					</Button>
				</Modal.Footer>
			</Modal>
			<PageBreadcrumb title="Librarians" subName="Tables" />
			<Row>
				<Col>
					<Card>
						<Card.Header>
							<div className="my-2 d-flex justify-content-between">
								<Button variant="info" onClick={toggleStandard}>
									<i className="bi bi-plus-lg" /> <span>Add New</span>
								</Button>
								<div className="d-flex gap-1">
									<Button variant="purple">
										<i className="ri-server-line me-1" /> <span>All</span>
									</Button>
									<Button className="btn-outline-primary">
										<i className="ri-server-line me-1" /> <span>Active</span>
									</Button>
									<Button className="btn-outline-danger">
										<i className="ri-server-line me-1" /> <span>Inactive</span>
									</Button>
								</div>
							</div>
							<Button className="btn-outline-purple" onClick={toggle}>
								<i className="ri-equalizer-line me-1" /> Filter
							</Button>
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

export default Librarians
