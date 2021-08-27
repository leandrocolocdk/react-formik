import React from 'react'
import { useFormik } from 'formik'

function YoutubeForm() {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            channel: ''
        },
        onSubmit: values => {
            console.log('Form data', values)
        },
        validate: values => {
            let errors = {}

            if (!values.name) {
                errors.name = "Required"
            }

            if (!values.email) {
                errors.email = "Required"
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Inavlid email format'
            }

            if (!values.channel) {
                errors.channel = "Required"
            }
        }
    })
    // console.log('Formik values:', formik.values)
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor='name'>Name</label>
                <input type='text'
                    id='name' name='name'
                    onChange={formik.handleChange}
                    value={formik.values.name} />

                <label htmlFor='email'>Email</label>
                <input type='email'
                    id='email' name='email'
                    onChange={formik.handleChange}
                    value={formik.values.email} />

                <label htmlFor='channel'>Channel</label>
                <input type='text'
                    id='channel' name='channel'
                    onChange={formik.handleChange}
                    value={formik.values.channel} />

                <button type="submit">Submit</button>
            </form >
        </div >
    )
}

export default YoutubeForm