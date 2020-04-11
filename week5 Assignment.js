import { bindActionCreators } from "redux";

//Task1
//add to ActionTypes
export const ADD_PARTNERS = 'ADD_PARTNERS';
export const PARTNERS_LOADING = 'PARTNERS_LOADING';
export const PARTNERS_FAILED = 'PARTNERS_FAILED';

//ActionCreators
export const fetchPartners = () => (dispatch) => {
    
    dispatch(partnersLoading());

    return fetch(baseUrl + 'partners')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(partners => dispatch(addPartners(partners)))
        .catch(error => dispatch(partnersFailed(error.message)));
};

export const partnersLoading = () => ({
    type: ActionTypes.PARTNERS_LOADING
});

export const partnersFailed = errMess => ({
    type: ActionTypes.PARTNERS_FAILED,
    payload: errMess
});

export const addPartners = partners => ({
    type: ActionTypes.ADD_PARTNERS,
    payload: partners
});

//redux partners.js file
import * as ActionTypes from './ActionTypes';
export const Partners = (state = { isLoading: true,
                                        errMess: null,
                                        partners: [] }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PARTNERS:
            return {...state, isLoading: false, errMess: null, partners: action.payload};

        case ActionTypes.PARTNERS_LOADING:
            return {...state, isLoading: true, errMess: null, partners: []}

        case ActionTypes.PARTNERS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
            
        default:
          return state;
      }
};

// Main Componenet
add fetchPartners to import at top
import { createForms } from "react-redux-form";

fetchPromotions: () => (fetchPromotions()),
fetchPartners: () => (fetchPartners())

//update this part wth partner info
class Main extends Component {

    componentDidMount() {
        this.props.fetchCampsites();
        this.props.fetchComments();
        this.props.fetchPromotions();

        this.props.fetchPartners();
    }

    render() {

        const HomePage = () => {
            return (
                <Home
                    campsite={this.props.campsites.campsites.filter(campsite => campsite.featured)[0]}
                    campsitesLoading={this.props.campsites.isLoading}
                    campsitesErrMess={this.props.campsites.errMess}
                    partner={this.props.partners.filter(partner => partner.featured)[0]}

                    partnerLoading={this.props.partners.isLoading}
                    partnerErrMess={this.props.partners.errMess}

                    promotion={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]}
                    promotionLoading={this.props.promotions.isLoading}
                    promotionErrMess={this.props.promotions.errMess}
                />
            );
        }

// Home Component
        <RenderCard
                            item={props.partner}
                            isLoading={props.partnerLoading}
                            errMess={props.partnerErrMess}
                        />

// About componenet
import { Loading } from './LoadingComponent';

//add .partners to ??


function PartnersList(props) {
    const partners = props.partners.map(partner => {
        return (
        <Media tag="li" key={partner.id}><RenderPartner partner={partner}></RenderPartner></Media>
        );
    });

    if (props.partners.isLoading) {
        return (
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    if (props.partners.errMess) {
        return (
            <div className="container">
                <div className="row"> 
                    <div className="col">
                        <h4>{props.parnters.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    } 
       return( 
       <div className="col mt-4">
                    <Media list>
                        {partners}
                    </Media>
                </div>
       );
    }
//Task2
action create

export const addComment = comment => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postFeedback = (firsName, lastName, phoneNum, email, agree, contactType, feedback) => {
    
    const newFeedback = {
            firstName: firsName,
            lastName: lastName,
            phoneNum: phoneNum,
            email: email,
            agree: agree,
            contactType: contactType,
            feedback: feedback
    };
    newFeedback.date = new Date().toISOString();

    return fetch(baseUrl + 'feedback', {
            method: "POST",
            body: JSON.stringify(newFeedback),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
                if (response.ok) {
                    return response;
                    alert('Thank you for your feedback!' + JSON.stringify(newFeedback));
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => { throw error; }
        )
        .then(response => response.json())
        .catch(error => {
            console.log('post feedback', error.message);
            alert('Your feedback could not be posted\nError: ' + error.message);
        });
};




//task 3 update to make it fit the partneres list, below is render comments fron CampsiteInfo. Fade and Stagger used in different spots though


