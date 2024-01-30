/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import Button from '@mui/material/Button';
// import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import CircularProgress from '@mui/material/CircularProgress';
import ErrorText from '../errorHandler';
import PopoverComponent from '../../popover';
import FileList from './fileList';
import CustomFileList from './customfileList';
import Service from '../../../service';
import {
  docSetMapping, BankAccList,
  IncomeProofList, PayslipProofList,
  CoBankAccList, CoIncomeProofList,
  CoPayslipProofList, CoKYCProofList, KYCProofList,
  PropertyProofList, CurrentResidenceProofList,
  CoBusinessAddressProofList, CoBusinessProofList,
  CoCurrentResidenceProofList, CoPermanentResidenceProofList,
  GuaBankAccList, GuaBasicDocumentsProofList, GuaBusinessAddressProofList,
  GuaBusinessProofList, GuaCurrentResidenceProofList, GuaIncomeProofList,
  GuaKYCProofList, GuaPayslipProofList, GuaPermanentResidenceProofList,
  PermanentResidenceProofList, BusinessProofList,
  BusinessAddressProofList, CoBasicDocumentsProofList, HunterDocumentList
} from '../../../common';

const CustomShowError = styled.div`
  margin-top: 15px;
  color: red;
  font-size: 11px;
`;
const CustomLoading = styled(CircularProgress)(({ theme }) => ({
  color: 'rgb(80, 13, 146)',
  display: 'block',
  marginTop: '10px',
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '20%',
}));
const FileUploadStyled = styled(Button)(({ theme }) => ({
  color: theme.button.primary,
  backgroundColor: theme.button.secondary,
  height: '100%',
  '&.MuiButton-root': {
    backgroundColor: theme.button.secondary,
    width: '100%',
    height: '63px'
  }
}));

const PopoverAdjusment = styled.div(() => ({
  position: 'absolute',
  top: '-10px',
  right: '-10px',
  zIndex: 2
}));

const FileInput = (props) => {
  const {
    register,
    errors,
    input,
    setValue,
    getValues,
    defaultValue
  } = props;
  // console.log(props);
  const location = useLocation();
  const { leadDetails } = useSelector((state) => state.leadDetails);
  const [loader, setLoader] = useState(false);
  const [arr, setArr] = useState([]);
  let ind = 0;
  if (location.pathname.includes('co-applicant') || location.pathname.includes('guarantor')) {
    const { type } = useParams();
    const typeValue = type.split('=')[1];
    ind = typeValue ? Number(typeValue - 1) : 0;
  }
  const nthCoApplicantData = leadDetails?.applicant?.co_applicant[ind];
  const nthGuarantorData = leadDetails?.applicant?.guarantors ? leadDetails?.applicant?.guarantors[ind] : '';
  // Here defaultValue[0] is used to avoid code break for null value from db
  const TempImg = ((defaultValue && defaultValue.length > 0 && defaultValue[0])
    ? defaultValue : []);
  useEffect(() => {
    if (arr.length > 0 && input?.isMulti) {
      setValue(`${input.name}`, arr);
    } else {
      // Here earlier complete array was passed but since it is a single upload so we just need to get first element present in TempImg
      setValue(`${input.name}`, TempImg?.[0]);
    }
  }, [arr, input?.isMulti]);
  // const location = useLocation();
  const [img, setImg] = useState(TempImg);
  const [showError, setShowError] = useState([]);
  const pushFileToS3 = async (url, fields, file, index, fileLength) => {
    // create a form obj
    const formData = new FormData();
    // append the fields in presignedPostData in formData
    Object.keys(fields)?.forEach((key) => {
      formData.append(key, fields[key]);
    });

    // append the file
    formData.append('file', file);
    // post the data on the s3 url
    await Service.postWithFile(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*'
      }
    }).then(() => {
      index === fileLength ? setLoader(false) : '';
      // console.log(response);
      // setLoader(false);
    })
      .catch((error) => {
        setLoader(false);
        console.error(error);
      });
  };
  /**
   * @function uploadFile
   * @param {object} data - for uploading file input, it takes filename file and file type
   * @returns {any} it is mainly used for handle state for rendering file
   */
  const uploadFile = async (data) => {
    setLoader(true);
    const t = [];
    let MappedValues = {};
    /**
     Earlier Mapped Values were randomly generating doc set for applicant, co-applicant and property
     But now Mapped Values will be having only specific section JSON
     This has been done to avoid overriding of each others sections mapping
     */
    if (location.pathname.includes('property')) {
      const PropertyProofListDoc = PropertyProofList(leadDetails);
      console.log(PropertyProofListDoc, 'PropertyProofListDoc');
      MappedValues = {
        ...PropertyProofListDoc
      };
    } else if (location.pathname.includes('verification-documents')) {
      const HunterDocumentList1 = HunterDocumentList(leadDetails);
      MappedValues = {
        ...HunterDocumentList1
      };
    } else if (location.pathname.includes('guarantor')) {
      const GuaBasicDocumentsProofListDoc = GuaBasicDocumentsProofList(ind);
      const GuaBankAccListDoc = GuaBankAccList(nthGuarantorData, ind);
      const GuaIncomeProofListDoc = GuaIncomeProofList(nthGuarantorData, ind);
      const GuaPayslipProofListDoc = GuaPayslipProofList(nthGuarantorData, ind);
      const GuaKYCProofListDoc = GuaKYCProofList(nthGuarantorData, ind);
      const GuaCurrentResidenceProofListDoc = GuaCurrentResidenceProofList(nthGuarantorData, ind);
      const GuaPermanentResidenceProofListDoc = GuaPermanentResidenceProofList(nthGuarantorData, ind);
      const GuaBusinessProofListDoc = GuaBusinessProofList(nthGuarantorData, ind);
      const GuaBusinessAddressProofListDoc = GuaBusinessAddressProofList(nthGuarantorData, ind);
      MappedValues = {
        ...MappedValues,
        ...GuaBasicDocumentsProofListDoc,
        ...GuaBankAccListDoc,
        ...GuaIncomeProofListDoc,
        ...GuaPayslipProofListDoc,
        ...GuaKYCProofListDoc,
        ...GuaCurrentResidenceProofListDoc,
        ...GuaPermanentResidenceProofListDoc,
        ...GuaBusinessProofListDoc,
        ...GuaBusinessAddressProofListDoc
      };
    } else if (location.pathname.includes('co-applicant')) {
      const CoBasicDocumentsProofListDoc = CoBasicDocumentsProofList(ind);
      const CoBankAccListDoc = CoBankAccList(nthCoApplicantData, ind);
      const CoIncomeProofListDoc = CoIncomeProofList(nthCoApplicantData, ind);
      const CoPayslipProofListDoc = CoPayslipProofList(nthCoApplicantData, ind);
      const CoKYCProofListDoc = CoKYCProofList(nthCoApplicantData, ind);
      const CoCurrentResidenceProofListDoc = CoCurrentResidenceProofList(nthCoApplicantData, ind);
      const CoPermanentResidenceProofListDoc = CoPermanentResidenceProofList(nthCoApplicantData, ind);
      const CoBusinessProofListDoc = CoBusinessProofList(nthCoApplicantData, ind);
      const CoBusinessAddressProofListDoc = CoBusinessAddressProofList(nthCoApplicantData, ind);
      MappedValues = {
        ...MappedValues,
        ...CoBasicDocumentsProofListDoc,
        ...CoBankAccListDoc,
        ...CoIncomeProofListDoc,
        ...CoPayslipProofListDoc,
        ...CoKYCProofListDoc,
        ...CoCurrentResidenceProofListDoc,
        ...CoPermanentResidenceProofListDoc,
        ...CoBusinessProofListDoc,
        ...CoBusinessAddressProofListDoc
      };
    } else if (location.pathname.includes('applicant')) {
      const BankAccListDoc = BankAccList(leadDetails);
      const IncomeProofListDoc = IncomeProofList(leadDetails);
      const PayslipProofListDoc = PayslipProofList(leadDetails);
      const KYCProofListDoc = KYCProofList(leadDetails);
      const CurrentResidenceProofListDoc = CurrentResidenceProofList(leadDetails);
      const PermanentResidenceProofListDoc = PermanentResidenceProofList(leadDetails);
      const BusinessProofListDoc = BusinessProofList(leadDetails);
      const BusinessAddressProofListDoc = BusinessAddressProofList(leadDetails);
      MappedValues = {
        ...docSetMapping,
        ...BankAccListDoc,
        ...IncomeProofListDoc,
        ...PayslipProofListDoc,
        ...KYCProofListDoc,
        ...CurrentResidenceProofListDoc,
        ...PermanentResidenceProofListDoc,
        ...BusinessProofListDoc,
        ...BusinessAddressProofListDoc
      };
    }
    const d = input?.fileName;
    let payload;
    let extension = data?.type;
    extension = extension.substring(extension.indexOf('/') + 1);
    if (d !== undefined) {
      let docName = '';
      /**
       Here Now docName would be different for different section i.e. Applicant -> PAN, Co-Applicant-> Co_0_PAN, Co_1_PAN etc
       */
      if (location.pathname.includes('co-applicant')) {
        docName = `Co_${ind}_`;
      }
      if (location.pathname.includes('guarantor')) {
        docName = `Gua_${ind}_`;
      }
      docName += d.replaceAll(' ', '_');
      // console.log(MappedValues, 'MappedValues', docName);
      payload = MappedValues[docName];
    } else if (location.pathname.includes('hunterspoc')) {
      payload = { dsn: 'VERIFICATION DOCUMENTS=HUNTER CLEARANCE APPROVAL', fn: data?.filename };
    } else if (location.pathname.includes('legal')) {
      payload = { dsn: 'VERIFICATION DOCUMENTS=SEARCH REPORT', fn: data?.filename };
    } else {
      payload = { dsn: 'OTHERS=ADDITIONAL-DOCUMENT', fn: data?.filename };
    }
    if (input?.dsn) {
      if (getValues('document_type') !== undefined) {
        payload = { dsn: `${getValues('document_type')}`, fn: data?.filename };
      } else {
        payload = { dsn: input?.dsn, fn: data?.filename };
      }
    }
    if (input?.addDocsEnable && getValues('doc_type') !== undefined && getValues('document_sub_type') !== undefined) {
      payload = { dsn: `${getValues('doc_type')}=${getValues('document_sub_type')}`, fn: data?.filename };
    }
    await Service.post(process.env.REACT_APP_UPLOAD_S3_SERVICE, {
      ...payload,
      app_id: leadDetails?.application_id,
      ext: extension,
      ft: data?.type
    }).then(async (response) => {
      t.push({
        file_url: response?.data?.url,
        key: response?.data?.ky,
        file_name: data?.filename
      });
      setImg((prev) => ([...prev, ...t]));
      await pushFileToS3(response?.data?.url, response?.data?.fld, data?.file, data.index === data.fileLength);
      await Service.post(process.env.REACT_APP_MARK_UPLOAD_SUCCESS, {
        ...payload,
        app_id: leadDetails?.application_id,
        ky: response?.data?.ky,
      }).then((res) => {
        const { status } = res;
        if (status === 200) {
          data.index === data.fileLength ? setLoader(false) : '';
          // setLoader(false);
          // eslint-disable-next-line no-empty
          if (!input?.isMulti) {
            setValue(`${input.name}`, res?.data?.ud);
          } else {
            setArr((prev) => ([...prev, res?.data?.ud]));
          }
        } else {
          setShowError('File Not Uploaded');
        }
      }).catch((error) => {
        setLoader(false);
        console.error('res error', error);
      });
    }).catch((error) => {
      setLoader(false);
      console.error(error);
    });
  };

  const handleImage = (e) => {
    setLoader(true);
    setShowError([]);
    Object.keys(e?.target?.files)?.forEach((file, index) => {
      if (e.target.files[file]?.size > input?.fileSize) {
        const size = (input.fileSize / 1024) / 1024;
        console.log(size);
        setShowError((prev) => ([...prev, `Please Upload file of size less than ${size} MB`]));
        setLoader(false);
      } else if (!input.fileType.includes(e.target.files[file]?.type)) {
        setShowError((prev) => ([...prev, input.fileTypeError || 'Only PNG, JPEG, JPG and PDF files are allowed']));
        setLoader(false);
      } else {
        uploadFile({
          filename: e.target.files[file]?.name,
          file: e.target.files[file],
          type: e.target.files[file]?.type,
          fileLength: e.target.files.length,
          index: index + 1
        });
      }
    });
  };
  /**
   * @function removeImg
   * @param {integer} index - It take an integer index which is used to remove the file from Img array from that Index
   * @returns {any} - triggers handleChange method used in below components
   */
  const removeImg = (index) => {
    setShowError('');
    const temp = [...img];
    // eslint-disable-next-line no-alert
    const check = window.confirm('Do you want to delete the file');
    if (check) {
      const fileData = !input?.isMulti ? getValues([`${input.name}`]) : getValues(`${input.name}`);
      if (temp.length > 0) {
        // const deleteIndex = fileData.findIndex((item) => item.base_path === temp[index].base_path);
        temp.splice(index, 1);
        fileData.splice(index, 1);
      }
      setImg(temp);
      if (temp.length > 0) {
        setArr(fileData);
        setValue(`${input.name}`, fileData);
      } else {
        // handled for single file deletion in case of multiple file upload
        setArr(fileData);
        setValue(`${input.name}`, fileData, { shouldValidate: false });
      }
    }
  };

  return (
    <>
      <h4>{input.label}</h4>
      {
        img.length > 0
        && input?.isMulti && (
        <PopoverAdjusment>
          <PopoverComponent>
            <FileList img={img} removeImg={removeImg} openDocPreview={input?.openDocPreview} />
          </PopoverComponent>
        </PopoverAdjusment>
        )
      }
      {
        img.length > 0 && !input?.isMulti && !loader
          ? (
            <CustomFileList img={img} removeImg={removeImg} />
          )
          : (
            <FileUploadStyled
              variant={input?.variant || 'contained'}
              component='label'
              hidden
              style={{ ...input?.style }}
            >
              {(loader) ? <CustomLoading /> : 'Upload File'}
              <input
                type='file'
                {...register(
                  input?.name,
                  { required: ((!img.length && input?.validation?.isRequired)) }
                )}
                // eslint-disable-next-line react/jsx-boolean-value
                disabled={!input?.isMulti && img?.length >= 1}
                multiple={input?.isMulti}
                hidden
                onChange={handleImage}
              />
            </FileUploadStyled>
          )
        }
      {
        showError && showError?.map((val) => (
          <CustomShowError>
            {val}
          </CustomShowError>
        ))
      }
      {img.length ? '' : <ErrorText input={input} errors={errors} />}
    </>
  );
};

export default FileInput;
