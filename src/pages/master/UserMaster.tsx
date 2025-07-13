// import { useEffect, useRef } from "react"
import { Text, Input, ButtonConfirm } from '../../component/UIComponents'
// import { Link } from "react-router-dom"
// import { httpGet, httpPost } from "../services/httpClient.js"
// import { useLoading } from "../hooks/LoadingContext.js"
// import { DialogInfo } from "./dialogs/DialogInfo.js"
// import { useDialog } from "../hooks/DialogContext.js"
// import { Validator } from "../common/validator.js"
// import { isUndefOrStrEmpty, DataBinding, FormCollection } from "../common/common.js"
import SlideZone from '../../libs/SlideZone'
import ToolBar from '../../libs/ToolBar'
import style from '../css/UserMaster.module.css'
import type { IGridList, IGridColumn } from '../../grids/interface/IGrid'
import dummy from '../../assets/dummy'
import { DataGrid } from '../../grids/DataGrid'
import ListTable from '../../grids/TableList'

export function UserMaster() {
	// let validator;
	// const phoneRef = useRef(null);
	// const nameRef = useRef(null);
	// const storeRef = useRef(null);
	// const mailRef = useRef(null);
	// const formRef = useRef(null);
	// const { settingDialog, openDialog, closeDialog } = useDialog()
	// const { settingLoading } = useLoading();

	// const Register = async (e) => {
	// 	e.preventDefault();
	// 	settingLoading(true)
	// 	createValidator();

	// 	const valid = await validator.Excute();
	// 	if (!valid) {
	// 		return Promise.resolve()
	// 			.finally(() => {
	// 				settingLoading(false);
	// 			})
	// 	}

	// 	return httpPost("Authentication/PostUser", FormCollection(formRef.current))
	// 		.then((res) => {
	// 			settingDialog(<DialogInfo content={[res.data.messageRtr]} type={'info'} closeDialog={closeDialog} />);
	// 			openDialog();
	// 		}).catch((err) => {
	// 			settingDialog(<DialogInfo content={[err.response.data.messageRtr]} type={'alert'} closeDialog={closeDialog} />);
	// 			openDialog();
	// 		}).finally(() => {
	// 			settingLoading(false);
	// 		})
	// }

	// const SearchUser = async () => {
	// 	settingLoading(true)

	// 	var url = "Authentication/GetSearchUser?phone=" + localStorage.getItem("phone")
	// 	return httpGet(url)
	// 		.then((res) => {
	// 			DataBinding(res.data.dataRtn, formRef.current);
	// 		}).catch((err) => {
	// 			settingDialog(<DialogInfo content={[err.response.data.messageRtr]} type={'alert'} closeDialog={closeDialog} />);
	// 			openDialog();
	// 		}).finally(() => {
	// 			settingLoading(false);
	// 		})
	// }

	// let validations = {
	// 	name:
	// 	{
	// 		methods: {
	// 			isNull: true,
	// 		}
	// 		, name: "Tên thành viên"
	// 		, messages: {
	// 			isNull: "Xin hãy nhập."
	// 		}
	// 	},
	// 	store:
	// 	{
	// 		methods: {
	// 			isNull: true,
	// 		}
	// 		, name: "Tên cửa hàng"
	// 		, messages: {
	// 			isNull: "Xin hãy nhập."
	// 		}
	// 	},
	// 	mail:
	// 	{
	// 		methods: {
	// 			isNull: true,
	// 			isMail: true
	// 		}
	// 		, name: "Email"
	// 		, messages: {
	// 			isNull: "Xin hãy nhập.",
	// 			isMail: "Email không hợp lệ."
	// 		}
	// 	}
	// };

	// const createValidator = () => {
	// 	validations.name.element = nameRef.current;
	// 	validations.store.element = storeRef.current;
	// 	validations.mail.element = mailRef.current;
	// 	validator = new Validator(validations, {
	// 		name: nameRef
	// 		, store: storeRef
	// 		, mail: mailRef
	// 	});
	// };

	// useEffect(() => {
	// 	SearchUser();
	// 	return () => {

	// 	}
	// }, [])

	let cols: string[] = []
	let data: object[] = dummy;

	for (const [key, value] of Object.entries(data[0])) {
		cols.push(key)
	}

	const ConfigColumn: IGridColumn[] = [
		{ name: "name", label: "name", width: "150px", key: 0, hidden: false }
		, { name: "language", label: "language", width: "100px", key: 0, hidden: false }
		, { name: "id", label: "id", width: "190px", key: 0, hidden: false }
		, { name: "bio", label: "bio", width: "550px", key: 0, hidden: false }
		, { name: "version", label: "version", width: "70px", key: 0, hidden: false }
	]

	const ConfigTable: IGridList = {
		colModel: ConfigColumn
		, data: data
	};

	return (
		<>
			<SlideZone title='Search condition'>
				<div className={style['page-container']}>
					<div className="row row-control">
						<div className="col-sm-2 lbl-control">
							<Text
								text='Nhập mã nhân viên'
							/>
						</div>
						<div className="col-sm-4 control">
							<Input
								type="text"
								className=""
							/>
						</div>
						<div className="col-sm-2 lbl-control">
							<Text
								text='Nhập tên nhân viên'
							/>
						</div>
						<div className="col-sm-4 control">
							<Input
								type="text"
								className=""
							/>
						</div>

					</div>
					<div className="row row-control">
						<div className="col-sm-2 lbl-control">
							<Text
								text='Nhập mã nhân viên'
							/>
						</div>
						<div className="col-sm-4 control">
							<Input
								type="text"
								className=""
							/>
						</div>
						<div className="col-sm-2 lbl-control">
							<Text
								text='Nhập tên nhân viên'
							/>
						</div>
						<div className="col-sm-4 control">
							<Input
								type="text"
								className=""
							/>
						</div>

					</div>
				</div>
			</SlideZone>
			<ToolBar>
				<ButtonConfirm text="tim kiem"></ButtonConfirm>
				<ButtonConfirm text="luu"></ButtonConfirm>
			</ToolBar>
			{/* <DataGrip {...ConfigTable}></DataGrip> */}
			<ListTable {...ConfigTable}></ListTable>
		</>
	)
}