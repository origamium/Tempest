import {Schema} from 'normalizr';
import {ITransform} from '../Data/Dynamizr/Interfaces/ITransform';

export interface ReturnedDatumInfoType {
    normalizrSchema: Schema;
    transformerSchema: ITransform;

    /*
     *  default: null. In this state, checking HTTP Status Code.
     *  e.g. Slack is always return 200 OK, error checking must be see "ok" parameter.
    */
    extendErrorCheck?: string;

    /*
    * default: null. In this state, target data is received json/xml data.
    * e.g. Slack is always contain "ok" parameter in return data, and It always changing target data by request api.
    */
    targetParameterName?: string;
}
