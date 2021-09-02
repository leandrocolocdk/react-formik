import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik'
import * as Yup from 'yup'
import TextError from './TextError'

const initialValues = {
    name: '',
    email: '',
    channel: '',
    comments: '',
    address: '',
    social: {
        facebook: '',
        twitter: ''
    },
    phoneNumbers: ['', ''],
    phNumbers: [''],
}

const savedValues = {
    name: 'leandro',
    email: 'leandrocolo@gmail.com ',
    channel: 'leanYoutube',
    comments: 'jajaja',
    address: 'home',
    social: {
        facebook: '',
        twitter: ''
    },
    phoneNumbers: ['', ''],
    phNumbers: [''],
}
const onSubmit = (values, onSubmitProps) => {
    console.log('Form data', values)
    console.log('Submit props', onSubmitProps)
    onSubmitProps.setSubmitting(false)
    onSubmitProps.resetForm()
}

const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
    channel: Yup.string().required('Required'),
})

function YoutubeForm() {
    const [formValues, setFormValues] = useState(null)

    // console.log('Formik values:', formik.values)
    // console.log('Formik errors:', formik.errors)
    // console.log('Visited fields:', formik.touched)
    return (
        <Formik
            initialValues={formValues || initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
        >

            {
                formik => {
                    console.log('Formik props', formik)
                    return (

                        <Form >
                            <div className="form-control">
                                <label htmlFor='name'>Name</label>
                                <Field type='text'
                                    id='name' name='name'
                                />
                                <ErrorMessage name="name" component={TextError} />
                            </div>

                            <div className="form-control">
                                <label htmlFor='email'>Email</label>
                                <Field type='email'
                                    id='email' name='email'
                                />
                                <ErrorMessage name="email" >
                                    {errorMsg => <div>{errorMsg}</div>}
                                </ErrorMessage>
                            </div>

                            <div className="form-control">
                                <label htmlFor='channel'>Channel</label>
                                <Field type='text'
                                    id='channel' name='channel'
                                />
                                <ErrorMessage name="channel" />
                            </div>

                            <div className="form-control">
                                <label htmlFor='comments'>Comments</label>
                                <Field as='textarea'
                                    id='comments' name='comments'
                                />
                                <ErrorMessage name="comments" />
                            </div>

                            <div className="form-control">
                                <label htmlFor='comments'>Address</label>
                                <Field name='address'>
                                    {
                                        props => {
                                            const { field, form, meta } = props
                                            // console.log('Render props', props)
                                            return (
                                                <div>
                                                    <input type="text" id='address' {...field} />
                                                    {meta.touched && meta.error ? <div>{meta.error}</div> : null}
                                                </div>
                                            )
                                        }
                                    }

                                </Field>
                                <ErrorMessage name="address" />
                            </div>

                            <div className="form-control">
                                <label htmlFor='facebook'>Facebook profile</label>
                                <Field type='text'
                                    id='facebook' name='social.facebook'
                                />
                                <ErrorMessage name="facebook" />
                            </div>

                            <div className="form-control">
                                <label htmlFor='twitter'>Twitter profile</label>
                                <Field type='text'
                                    id='twitter' name='social.twitter'
                                />
                                <ErrorMessage name="twitter" />
                            </div>

                            <div className="form-control">
                                <label htmlFor='primaryPh'>Primary phone number</label>
                                <Field type='text'
                                    id='primaryPh' name='phoneNumbers[0]'
                                />
                            </div>

                            <div className="form-control">
                                <label htmlFor='secondaryPh'>Secondary phone number</label>
                                <Field type='text'
                                    id='secondaryPh' name='poneNumbers[1]'
                                />
                            </div>

                            <div className="form-control">
                                <label htmlFor='secondaryPh'>List of phone number</label>
                                <FieldArray name='phNumbers'>
                                    {(fieldArrayProps) => {
                                        // console.log('fieldArrayProps', fieldArrayProps)
                                        const { push, remove, form } = fieldArrayProps
                                        const { values } = form
                                        const { phNumbers } = values
                                        return (
                                            <div>
                                                {phNumbers.map((phNumber, index) => (
                                                    <div key={index}>
                                                        <Field name={`phNumbers[${index}]`} />
                                                        {index > 0 &&
                                                            <button type="button" onClick={() => remove(index)}> - </button>}
                                                        <button type="button" onClick={() => push('')}> + </button>
                                                    </div>))
                                                }
                                            </div>
                                        )
                                    }}
                                </FieldArray>
                            </div>
                            <button type="submit" onClick={() => setFormValues(savedValues)}>Load save values</button>
                            <button type="reset" >Reset</button>
                            <button type="submit" disabled={!formik.isValid || formik.isSubmitting}>Submit</button>

                        </Form >
                    )
                }
            }

        </Formik >
    )
}

export default YoutubeForm
