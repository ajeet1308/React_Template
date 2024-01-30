/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */
import {
  useEffect, useState, useId, forwardRef
} from 'react';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { styled as MUIStyeld } from '@mui/material/styles';
import { cloneDeep } from 'lodash';
import { generateFields } from './renderHelper';
import Stepper from '../stepper';
import { FUNCTION_IDENTIFIER, IDENTIFIER } from '../../constants';
import { LoadingButtonPrimary, ButtonSecondary } from '../styledComponents';
import { formRefHandler } from './utils';

const _ = require('lodash');

const Alert = forwardRef((props, ref) => <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />);

const WrapperBox = styled(Box)(({ stepperDirection }) => ({
  display: 'flex',
  flexDirection: stepperDirection === 'vertical' ? 'row' : 'column',
  justifyContent: stepperDirection === 'vertical' ? 'space-around' : 'center',
  padding: stepperDirection === 'vertical' ? '15px' : '20px',
}));
const CustomForm = styled.form(({ theme, stepperDirection }) => ({
  width: '100%',
  padding: '20px',
  border: stepperDirection === 'vertical' ? `1px solid ${theme?.boxShadow?.secondary}` : 'none',
  borderRadius: stepperDirection === 'vertical' ? '10px' : '0',
}));

const CustomTitle = styled.div(() => ({
  display: 'flex',
  justifyContent: 'center',
  paddingBottom: '20px'
}));

const CustonButtonWrapper = MUIStyeld('div')(({ active }) => ({
  display: 'flex',
  justifyContent: active ? 'space-between' : 'flex-end',
  alignItems: 'center',
}));

const identifierData = [
  IDENTIFIER.INPUTNUMBER,
  IDENTIFIER.INPUTTEXT,
  IDENTIFIER.DATEPICKER,
  IDENTIFIER.TIMEPICKER,
];
const FormGenerator = ({
  formDetails,
  formHandler,
  changeEvent,
  isLoading,
  selectedValue,
  customReset,
  childSubmitFuncHandler,
  alertShow,
  setAlertShow,
  setValueRef,
  getValueRef,
  setErrorRef,
  clearErrorsRef
}) => {
  const [formData, setFormData] = useState({});
  const id = useId();
  const [formSubmitData, setFormSubmitData] = useState({});
  const [activeFormIndex, setActiveFormIndex] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [formValues, setFormValues] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    getValues,
    unregister,
    setError,
    clearErrors
  } = useForm();

  const unregisterHandler = (index) => {
    try {
      const tempForm = cloneDeep(formDetails);
      const previousForm = tempForm.form[index];
      const readFormValue = previousForm.input.map((item) => item.name);
      const previousFormValue = getValues(readFormValue);
      readFormValue?.forEach((item, inputIndex) => {
        if (previousFormValue[inputIndex] === undefined) { unregister(item); }
      });
    } catch (error) {
      console.error('Error', error);
    }
  };

  const stepperHandler = (value) => {
    setIsDisabled(true);
    let step = activeFormIndex;
    if (value === 'INCREMENT' && step < formDetails?.stepper?.steps?.length) {
      step += 1;
    }
    if (value === 'DECREMENT' && step > 0) {
      unregisterHandler(step);
      step -= 1;
    }
    setActiveFormIndex(step);
    setValue('activeFormIndex', step);
    setIsDisabled(false);
  };
  const showInput = (input) => {
    if (input?.condition !== undefined) {
      switch (input?.condition?.type) {
        case 'show':
          return (
            formSubmitData[input?.condition?.baseOn] !== undefined
            && formSubmitData[input?.condition?.baseOn] !== null
            && formSubmitData[input?.condition?.baseOn] !== '');
        case 'showOnValue':
          return _.get(
            _.isEmpty(formSubmitData) ? getValues() : formSubmitData,
            input?.condition?.baseOn
          ) === input?.condition?.baseValue;
        case 'showOnValueMultiSelect':
          return _.get(
            _.isEmpty(formSubmitData) ? getValues() : formSubmitData,
            input?.condition?.baseOn
          )?.includes(input?.condition?.baseValue);
        case 'showOnValueMulti':
          return input?.condition?.baseValue?.includes(_.get(
            _.isEmpty(formSubmitData) ? getValues() : formSubmitData,
            input?.condition?.baseOn
          )) || input?.condition?.baseValue?.includes(input?.condition?.baseOn);
        case 'dynamicShow':
          return (
            formSubmitData[input?.condition?.baseOn] !== undefined
            && formSubmitData[input?.condition?.baseOn] !== null
            && formSubmitData[input?.condition?.baseOn] !== '');
        case 'hide':
          return !input?.condition?.baseValue;
        default:
          break;
      }
    } else {
      return true;
    }
  };
  const onSubmit = (data) => {
    const form = formValues;
    const obj = {};
    formData?.input?.forEach((item) => {
      obj[item.name] = data[item.name];
    });

    let error = false;
    if (formData?.dynamicValidation) {
      error = formData?.dynamicValidation(data, setError, clearErrors);
    }
    if (error) {
      return;
    }
    if (formDetails?.dataFormat === 'MULTI') {
      form[formData.title] = obj;
      setFormValues(form);
    } else {
      setFormValues(data);
    }

    if (formDetails.nextFunction) {
      // Changed data --> formValues in nextFunction for stepper PD
      formDetails?.nextFunction(form, activeFormIndex, formValues)?.then((value) => {
        console.log('nextFunction', value);
        setIsDisabled(false);
        const btnDetails = formData.buttonDetails;
        if (childSubmitFuncHandler) {
          return getValues();
        }
        if (btnDetails.type === 'submit') return formHandler(formDetails?.dataFormat === 'MULTI' ? formValues : data);
        stepperHandler('INCREMENT');
      }).catch((e) => {
        setIsDisabled(false);
        console.log('e', e);
      });
    } else {
      const btnDetails = formData?.buttonDetails;
      if (childSubmitFuncHandler) {
        return getValues();
      }
      if (btnDetails.type === 'submit') return formHandler(formDetails?.dataFormat === 'MULTI' ? formValues : data);
      stepperHandler('INCREMENT');
    }
  };

  const generaterForm = (input) => {
    const value = getValues();
    const checkRender = { ...input };

    return (
      generateFields(
        id,
        checkRender,
        register,
        errors,
        formData.alignment,
        // eslint-disable-next-line max-len
        (value && _.get(value, input.name) !== undefined) ? _.get(value, input.name) : input.defaultValue,
        setValue,
        getValues,
        formData?.variant
      ));
  };
  // HANDLE DYNAMIC CALL ON CHANGE
  const handleDynamicChangeCall = async (value, name) => {
    const tempData = formDetails?.form[value.activeFormIndex];
    const dynamicValue = formDetails?.form[value.activeFormIndex]?.input?.map((item, index) => {
      if (item.functionMethod === FUNCTION_IDENTIFIER.ON_CHANGE
        && item.functionChangeBaseOn === name && item.customFunction !== undefined) {
        return new Promise((resolve) => {
          item.customFunction(value, (options) => {
            if (identifierData.includes(item.identifier)) {
              tempData.input[index].defaultValue = options;
              setValue(item.name, options);
            } else {
              tempData.input[index].option = options;
            }
            resolve(resolve);
          }, setValue, setError, clearErrors);
        });
      }
      return true;
    });

    if (dynamicValue) {
      Promise.all(dynamicValue).then(() => {
        setFormData({ ...tempData });
      });
    }
  };

  const handledynamicInitCall = async () => {
    console.log('our formdetail', formDetails, formSubmitData);
    const tempData = formDetails?.form[formSubmitData.activeFormIndex ?? activeFormIndex];
    const value = formDetails?.form[formSubmitData.activeFormIndex ?? activeFormIndex]?.input
      .map((item, index) => {
        if (item.functionMethod === FUNCTION_IDENTIFIER.ON_INIT
          && item.customFunction !== undefined) {
          return new Promise((resolve) => {
            item.customFunction(formSubmitData ?? getValues(), (values) => {
              if (identifierData.includes(item.identifier)) {
                setValue(item.name, values);
              } else {
                tempData.input[index].option = values;
              }
              resolve(values);
            }, setValue);
          });
        }
        return true;
      });
    if (value) {
      await Promise.all(value).then(() => {
        setFormData({ ...tempData });
      });
    }
  };

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      console.log('subscription', value);
      setFormSubmitData(value);
      handleDynamicChangeCall(value, name, type);
      if (changeEvent) changeEvent(name, type, value);
    });
    return () => subscription.unsubscribe();
  }, [watch, selectedValue]);

  useEffect(() => {
    setFormData(formDetails.form[activeFormIndex]);
    handledynamicInitCall();
    setFormSubmitData(getValues());
    console.log('we are inside 2nd useeffect');
  }, [activeFormIndex, selectedValue]);

  useEffect(() => {
    register('activeFormIndex', { value: 0 });
    console.log('we are inside 3rd use effect');
    formRefHandler(
      childSubmitFuncHandler,
      setValueRef,
      getValueRef,
      setErrorRef,
      clearErrorsRef,
      setValue,
      getValues,
      setError,
      clearErrors,
      handleSubmit,
      onSubmit,
    );
  }, []);
  // useEffect(() => {
  //   console.log('abc', formDetails);
  //   reset();
  // }, [selectedValue]);
  return (
    <WrapperBox stepperDirection={formDetails?.stepper?.stepperDirection}>
      {
        formDetails?.form?.length > 1 && (
          <Stepper
            stepper={formDetails?.stepper}
            activeFormIndex={activeFormIndex}
            setValue={setValue}
            setActiveFormIndex={setActiveFormIndex}
          />
        )
      }
      <CustomForm
        style={{ ...formData?.style }}
        onSubmit={handleSubmit(onSubmit)}
        stepperDirection={formDetails?.stepper?.stepperDirection}
      >
        {formData?.title && <CustomTitle>{formData?.title}</CustomTitle>}
        <Grid container spacing={2}>
          {formData?.input?.map((item) => showInput(item) && generaterForm(item))}
        </Grid>
        {
          formData?.optionAdd
          && formData?.optionDataInput?.map((item) => generaterForm(item))
        }
        <CustonButtonWrapper active={activeFormIndex > 0}>
          {
            activeFormIndex > 0 && (
              <ButtonSecondary
                disabled={isDisabled}
                onClick={() => stepperHandler('DECREMENT')}
              >
                {formData?.buttonDetails?.previous ?? 'Back'}
              </ButtonSecondary>
            )
          }
          {formData.buttonDetails && !childSubmitFuncHandler ? (
            <LoadingButtonPrimary
              loading={isLoading}
              variant='contained'
              disabled={isDisabled || formData?.buttonDetails?.disabled}
              type='submit'
              style={{ ...formData?.buttonDetails?.style }}
            >
              {formData?.buttonDetails?.name}
            </LoadingButtonPrimary>
          ) : null}
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={alertShow?.open}
            autoHideDuration={3000}
            key='top center'
            onClose={() => setAlertShow({ ...alertShow, open: false })}
          >
            <Alert
              severity={alertShow?.alertType ?? 'success'}
              sx={{ width: '100%' }}
              onClose={() => setAlertShow({ ...alertShow, open: false })}
            >
              {alertShow?.msg}
            </Alert>
          </Snackbar>
        </CustonButtonWrapper>
      </CustomForm>
    </WrapperBox>
  );
};

export default FormGenerator;
