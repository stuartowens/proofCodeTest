import axios from 'axios'
import {host} from '../../../../config.js';

export const formName = (data) => ({
  type: 'FORM_NAME',
  data
});

export const formEmail = (data) => ({
  type: 'FORM_EMAIL',
  data
})

export const formMessage = (data) => ({
  type: 'FORM_MESSAGE',
  data
})

export const formReset = () => ({
  type: 'FORM_RESET'
})

export const formPosting = () => ({
  type: 'FORM_POSTING'
})

export const formPosted =() => ({
  type: 'FORM_POSTED'
})

export const formError = (message) => ({
  type: 'FORM_ERROR',
  message
})

export const formErrorClr = () => ({
  type: 'FORM_ERROR_CLR'
})

export const sendForm = (form) => ((dispatch) => {
  dispatch(formPosting());
  return axios ({
    url: `https://${host}/contact`,
    type: 'POST',
    data: form
  })
  .then((res)=> {
    console.log(res)
    dispatch(formPosted());
    dispatch(formReset());
  })
  .catch((err)=> {
    console.log(err)
    dispatch(formPosted());
    dispatch(formError('An error has occurred'))
  });
});
