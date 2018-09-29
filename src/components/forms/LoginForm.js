import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { ME_QUERY } from '../App';

const LoginForm = props => {
  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string().required('You must enter a username'),
        password: Yup.string().required('You must enter a valid password'),
      })}
      onSubmit={async ({ username, password }, { setSubmitting }) => {
        const response = await props.login({
          variables: {
            username,
            password,
          },
          update: (store, { data: { login } }) => {
            const data = store.readQuery({ query: ME_QUERY })
            data.me = login
            store.writeQuery({ query: ME_QUERY, data })
          },
        })

        const { token, refreshToken } = response.data.login

        setSubmitting(false)

        localStorage.setItem('token', token)
        localStorage.setItem('refreshToken', refreshToken)

        props.history.push('/dashboard')
      }}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props
        return (
          <form onSubmit={handleSubmit}>
            <div className="field">
              <input
                name="username"
                className={
                  errors.username && touched.username
                    ? 'input is-large is-danger'
                    : 'input is-large'
                }
                type="text"
                placeholder="enter a username"
                required
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <br />
              {errors.username &&
                touched.username && (
                  <article className="message is-danger">
                    <div className="message-body">
                      <strong>{errors.username}</strong>
                    </div>
                  </article>
                )}
            </div>
            <div className="field">
              <input
                name="password"
                className={
                  errors.password && touched.password
                    ? 'input is-large is-danger'
                    : 'input is-large'
                }
                type="password"
                placeholder="enter a password"
                required
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <br />
              {errors.password &&
                touched.password && (
                  <article className="message is-danger">
                    <div className="message-body">
                      <strong>{errors.password}</strong>
                    </div>
                  </article>
                )}
            </div>
            <button
              type="button"
              className="button is-danger is-large is-fullwidth"
              onClick={handleReset}
              disabled={!dirty || isSubmitting}
            >
              Reset
            </button>
            <br />
            <button
              type="submit"
              className="button is-primary is-large is-fullwidth"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </form>
        )
      }}
    </Formik>
  )
}

export default LoginForm
