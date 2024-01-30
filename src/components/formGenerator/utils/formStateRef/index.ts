/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
const formRefHandler = (
  childSubmitFuncHandler: any,
  setValueRef: any,
  getValueRef: any,
  setErrorRef: any,
  clearErrorsRef: any,
  setValue: any,
  getValues: any,
  setError: any,
  clearErrors: any,
  handleSubmit: any,
  onSubmit: any,
) => {
  try {
    if (childSubmitFuncHandler) {
      childSubmitFuncHandler.current = handleSubmit(onSubmit);
    }
    if (setValueRef) {
      setValueRef.current = setValue;
    }
    if (getValueRef) {
      getValueRef.current = getValues;
    }
    if (setErrorRef) {
      setErrorRef.current = setError;
    }
    if (clearErrorsRef) {
      clearErrorsRef.current = clearErrors;
    }
  } catch (err) {
    console.log(err);
  }
};

export {
  formRefHandler
};
