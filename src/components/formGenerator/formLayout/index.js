import TextInput from './textInputGrid';
import Select from './selectGrid';
import RadioInput from './radioInputGrid';
import CheckboxInput from './checkboxInputGrid';
import ButtonInput from './buttonInputGrid';
import MultiSelectInput from './multiSelectGrid';
import DatePickerInput from './datePickerGrid';
import TimePickerInput from './timePickerGrid';
import PasswordInput from './passwordInputGrid';
import FileInput from './fileInputGrid.js';
import Toggle from './toggleGrid';
import ChipInput from './chipInputGrid';
import SearchableSelectInputGrid from './searchableSelectInputGrid';
import InfiniteScrollSelectGrid from './infiniteScrollSelectGrid';
import Seperator from './separatorGrid';
import SearchInputSelectGrid from './searchInputSelectGrid';
import EmptyGrid from './emptyGrid';
import { IDENTIFIER } from '../../../constants';
import LabelGrid from './labelGrid';

export const FormFields = {
  [IDENTIFIER.INPUTTEXT]: TextInput,
  [IDENTIFIER.SELECT]: Select,
  [IDENTIFIER.RADIO]: RadioInput,
  [IDENTIFIER.CHECKBOX]: CheckboxInput,
  [IDENTIFIER.BUTTON]: ButtonInput,
  [IDENTIFIER.TIMEPICKER]: TimePickerInput,
  [IDENTIFIER.DATEPICKER]: DatePickerInput,
  [IDENTIFIER.MULTISELECT]: MultiSelectInput,
  [IDENTIFIER.PASSWORD]: PasswordInput,
  [IDENTIFIER.FILE]: FileInput,
  [IDENTIFIER.Toggle]: Toggle,
  [IDENTIFIER.ChipInput]: ChipInput,
  [IDENTIFIER.SEARCHABLESELECT]: SearchableSelectInputGrid,
  [IDENTIFIER.SEARCHSELECT]: SearchInputSelectGrid,
  [IDENTIFIER.FORMTITLE]: LabelGrid,
  [IDENTIFIER.INFINITESCROLLSEARCH]: InfiniteScrollSelectGrid,
  [IDENTIFIER.SEPERATOR]: Seperator,
  [IDENTIFIER.FORMTITLE]: LabelGrid,
  [IDENTIFIER.EMPTYFIELD]: EmptyGrid
};
