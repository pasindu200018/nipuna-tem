import {
	Button,
	Card,
	Col,
	Row,
	Collapse as BootstrapCollapse,
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

const columns: ReadonlyArray<Column> = [
	{
		Header: 'Sr No',
		accessor: 'srNo',
		defaultCanSort: true,
	},
	{
		Header: 'Profile Picture',
		accessor: 'profilePicture',
		defaultCanSort: true,
	},
	{
		Header: 'Author First Name',
		accessor: 'name',
		defaultCanSort: false,
	},
	{
		Header: 'Author Last Name',
		accessor: 'AuthorLastName',
		defaultCanSort: false,
	},
	{
		Header: 'Author Pen Name',
		accessor: 'AuthorPenName',
		defaultCanSort: false,
	},
	{
		Header: 'Died',
		accessor: 'Died',
		defaultCanSort: false,
	},
	{
		Header: 'Nationality',
		accessor: 'nationality',
		defaultCanSort: false,
	},
	{
		Header: 'First Published Date',
		accessor: 'First Published Date',
		defaultCanSort: true,
	},
	{
		Header: 'Position',
		accessor: 'Position',
		defaultCanSort: false,
	},
	{
		Header: 'Income',
		accessor: 'Income',
		defaultCanSort: false,
	},
	{
		Header: 'Phone',
		accessor: 'Phone',
		defaultCanSort: false,
	},
	{
		Header: 'Email',
		accessor: 'Email',
		defaultCanSort: false,
	},
	{
		Header: 'Actions',
		accessor: 'Actions',
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

const Authors = () => {
	const [isOpen, setIsOpen] = useState<boolean>(true)
	const toggle = () => setIsOpen(!isOpen)
	return (
		<>
			<PageBreadcrumb title="Authors List" subName="Authors" />
			<Row>
				<Col>
					<Card>
						<Card.Header>
							<div className="my-2 d-flex justify-content-between">
							<Button className="btn-outline-purple" onClick={toggle}>
								<i className="ri-equalizer-line me-1" /> Filter
							</Button>
								<Button variant="info">
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

export default Authors
