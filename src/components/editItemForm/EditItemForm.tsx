import "./EditItemForm.scss";
import { EditItemFormTypes } from "./types";
import { FC, FormEvent, forwardRef } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { T_initialValues } from "../../types/types";
import { putFetch } from "../../redux/slices/adminSlice";
import { Form, Field, Formik, ErrorMessage } from "formik";
import { newItemValidation } from "../schemas/newItemSchema";
import { dateToNumber, numberToDate } from "../../utilities/index.ts";

const EditItemForm: FC<EditItemFormTypes> = forwardRef(({ item }, editDialogRef) => {
	const dispatch = useAppDispatch();

	const initialValues = {
		brand: item.brand,
		model: item.model,
		price: item.price,
		count: item.count,
		isDiscounted: item.isDiscounted,
		discountPercent: item.discountPercent,
		release: numberToDate(item.release),
		rating: item.rating,
		src: item.src,
		alt: item.alt,
	};

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const form = e.target as HTMLFormElement;

		const data = {
			brand: form.brand.value,
			model: form.model.value,
			price: Number(form.price.value),
			count: 0,
			isDiscounted: form.isDiscounted.checked,
			discountPercent: Number(form.discountPercent.value),
			release: dateToNumber(form.release.value),
			rating: 0,
			src: form.src.value,
			alt: form.alt.value,
		};

		dispatch(putFetch({ id: item.id, data: data }));
		if (editDialogRef && "current" in editDialogRef && editDialogRef.current) {
			editDialogRef.current.close();
		}
	}

	return (
		<Formik
			initialValues={initialValues as FormEvent<HTMLFormElement> & T_initialValues}
			validateOnChange={false}
			validateOnBlur={true}
			validationSchema={newItemValidation}
			onSubmit={handleSubmit}>
			{({ handleReset }) => {
				return (
					<dialog open={false} ref={editDialogRef} className={"EditItemForm"}>
						<Form onSubmit={handleSubmit}>
							<fieldset>
								<legend>{`${item.brand} ${item.model}`}</legend>
								<input
									type="button"
									value={"X"}
									onClick={() => {
										if (editDialogRef && "current" in editDialogRef && editDialogRef.current) {
											editDialogRef.current.close();
										}
									}}
								/>

								<div>
									<div className={"EditItemForm__left"}>
										<fieldset>
											<legend>
												brand <ErrorMessage name={"brand"} component={"span"} />
											</legend>
											<Field type={"text"} name={"brand"} placeholder={"brand..."} />
										</fieldset>

										<fieldset>
											<legend>
												model <ErrorMessage name={"model"} component={"span"} />
											</legend>
											<Field type={"text"} name={"model"} placeholder={"model..."} />
										</fieldset>

										<fieldset>
											<legend>
												Price <ErrorMessage name={"price"} component={"span"} />
											</legend>

											<Field type={"number"} name={"price"} placeholder={"price..."} />
										</fieldset>

										<fieldset>
											<legend>
												<label htmlFor={"isDiscounted"}>
													Discount
													<ErrorMessage name={"discountPercent"} component={"span"} />
												</label>
											</legend>

											<Field type={"checkbox"} name={"isDiscounted"} id={"isDiscounted"} />

											<Field
												type={"number"}
												name={"discountPercent"}
												className={"EditItemForm__discountPercent"}
												placeholder={"percent..."}
											/>
										</fieldset>
									</div>

									<div className={"EditItemForm__right"}>
										<fieldset>
											<legend>
												Release <ErrorMessage name="date" component={"span"} />
											</legend>
											<Field type={"date"} name={"release"} placeholder={"20240101"} />
										</fieldset>

										<fieldset>
											<legend>
												Rating <ErrorMessage name={"rating"} component={"span"} />
											</legend>

											<Field type={"number"} name={"rating"} placeholder={"rating..."} />
										</fieldset>

										<fieldset>
											<legend>
												src <ErrorMessage name={"src"} component={"span"} />
											</legend>
											<Field type={"text"} name={"src"} placeholder={"src..."} />
										</fieldset>

										<fieldset>
											<legend>
												alt <ErrorMessage name={"alt"} component={"span"} />
											</legend>
											<Field type={"text"} name={"alt"} placeholder={"alt..."} />
										</fieldset>
									</div>
								</div>

								<div className={"EditItemForm__bottomDiv"}>
									<input type={"submit"} value={"SAVE"} />
									<input type={"reset"} value={"RESET"} onClick={handleReset} />
								</div>
							</fieldset>
						</Form>
					</dialog>
				);
			}}
		</Formik>
	);
});

export default EditItemForm;
