import { handleSubmit } from './js/formHandler';
import { checkForCity } from './js/formChecker';
import { checkValidDate } from './js/formChecker';

import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'

document.getElementById('travel-form').addEventListener('click', handleSubmit);

export {
    checkForCity,
    checkValidDate,
    handleSubmit,
}