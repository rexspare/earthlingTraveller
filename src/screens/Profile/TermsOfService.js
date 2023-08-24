import React, { Component } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import CustomNav1 from '../../components/CustomNav1';
import Styles from '../../assets/Styles';

const SmallText = (props) => {
    return (
        <Text style={[Styles.fontGilroyLight, { textAlign: 'justify', fontSize: 17, marginBottom: 15, flex: 1 }]}>{props.children}</Text>
    )
}

const HeaderText = (props) => {
    return (
        <Text style={[Styles.fontGilroyBold, { fontSize: 23, marginBottom: 15 }]}><Icon size={20} name="chevron-right" /> {props.children}</Text>
    )
}

const BulletText = (props) => {
    return (
        <View style={{ flex: 1, flexDirection: 'row', marginLeft: 10, ...props.style }}>
            <Icon size={20} name={props.type ? props.type : "check"} />
            <Text style={[Styles.fontGilroyLight, { textAlign: 'justify', flex: 1, fontSize: 18, marginBottom: 15, marginLeft: 10 }]}>{props.children}</Text>
        </View>
    )
}

class TermsOfService extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image_uri: null,
            isLoading: true,
        };

    }

    render() {

        return (
            <View style={{ flex: 1 }}>
                <CustomNav1 title="Terms and Conditions" />
                <ScrollView contentContainerStyle={{ paddingHorizontal: 25, paddingVertical: 20 }}>
                    <SmallText>These <Text style={Styles.fontGilroyBold}>Terms and Conditions</Text> outline the rules and regulations for the use of our services at “Earthling”</SmallText>
                    <SmallText>Please read the terms carefully before using or accessing any material, information or services. Your use of the services provided by “Earthling” shall signify your acceptance of the terms and your agreement to be legally bound by the same .By accessing this, we assume you accept these terms and conditions in full. Do not continue to use our services if you do not accept all of the terms and conditions stated on this page. </SmallText>
                    <SmallText>These Terms and services are apply to everyone straightforwardly or in a roundabout way, made accessible on the web, through any cell phone, by email or by phone. By getting to, perusing and utilizing our (mobile) site or any of our applications through whatever stage (from this point forward by and large alluded to as the "Stage") as well as by finishing a booking, you recognize and consent to have perused.</SmallText>
                    <SmallText>The following terminology applies to these Terms and Conditions and any or all Agreements: "Client", "You" and "Your" refers to you, the person accessing this service and accepting the business terms and conditions. "The business", “Earthling”, "Ourselves", "We", "Our" and "Us", refers to our business. "Party", "Parties", or "Us", refers to both the Client and ourselves, or either the Client or ourselves.</SmallText>
                    <HeaderText>Headings</HeaderText>
                    <SmallText>The headings used herein are inserted for convenience of reference only and do not affect the construction or interpretation of the terms and conditions herein.</SmallText>
                    <HeaderText>Eligibility to Use</HeaderText>
                    <SmallText>Earthling services are not available to minors. Persons under 18 years of age are minors. It shall be your responsibility to ensure that you are eligible to enter into a contract if you do not conform to the above qualification, you are not permitted to avail of the Services. You represent that you are of legal age to form a binding contract and are not a person barred from receiving Services under the laws as applicable. You have the lawful position to make a legitimate commitment; you will utilize the Platform as per these Terms; you will just utilize this Platform for your private use to look for authentic hotel and private owned room deals; in the event that you utilize the Platform for the benefit of another person, you will tell them about the Terms that apply to any inquiries and additionally appointments you have made for their sake, including all principles and limitations appropriate thereto; all data provided by you to our Platform is valid, precise, current and complete; and in the event that you have a Earthling account, you will protect your record data and will administer and be totally answerable for any utilization of your record by you and anybody other than you.</SmallText>
                    <SmallText>“Earthling” reserves the right to refuse access to use the Services offered by us to new users or to terminate access granted to existing users at any time for any reason or without providing any reasons. We keep up all right to reject service to everybody in any way, shape or form whenever. </SmallText>
                    <HeaderText>Account Registration on Earthling</HeaderText>
                    <BulletText>To access Earthling you have to make account and to use other features.</BulletText>
                    <BulletText>You can make your account on earthling through your E-mail and create password</BulletText>
                    <BulletText>You have the option to make your account on Earthling through third parties like goggle, Facebook</BulletText>
                    <BulletText>You must have to provide the accurate, up to date and complete information about you during the registration process on Earthling.</BulletText>
                    <BulletText>You are not allowed to give your account to any other person or third party.</BulletText>
                    <BulletText>You are allowed to make only one account at a time in Earthling.</BulletText>
                    <BulletText>You are responsible for every activity which is taking place through your account, it’s your duty to keep your credentials secrete and maintain security of your account.</BulletText>
                    <HeaderText>Member Confirmation</HeaderText>
                    <SmallText>Earthling may make access to and utilization of the Earthling App, or certain regions or highlights of the Earthling Platform, subject to specific conditions or necessities, for example, finishing a check procedure, meeting explicit quality or qualification models, meeting Ratings or Reviews limits, or a Member's reserving and history of cancelation.</SmallText>
                    <SmallText>Client check on the Internet is troublesome and we don't accept any accountability for the affirmation of any Member's character. Despite the above mentioned, for straightforwardness and misrepresentation counteraction purposes, and as allowed by material laws, we may, yet have no commitment to </SmallText>
                    <BulletText>Solicit Members to give a structure from government recognizable proof or other data or attempt extra checks intended to help confirm the characters of Members, </BulletText>
                    <BulletText>Screen Members against outsider databases or different sources and solicitation reports from specialist co-ops, and </BulletText>
                    <BulletText>Where we have adequate data to distinguish a Member, get reports from open records of criminal feelings or sex guilty party enlistments or a proportionate variant of foundation or enrolled sex wrongdoer checks in your nearby ward (if accessible).</BulletText>
                    <HeaderText>We Do Not Sell Hotel, Private Owned Rooms Or Travel Product</HeaderText>
                    <SmallText>Earthling is a travel booking app for hotels and private owned homes. Earthling does not provide, own or control any of the travel services or does not provide, own or control any of the hotel service, private owned rooms and products that you can access through our services, such as accommodations, packages. The Products are owned, controlled or made available by third parties like hotel , home or travel providers either directly (e.g., hotel or home) or as an agent. These providers are responsible for the all the products and all booking contracts, including for e.g. Earthling booking app. The home or hotel Provider’s terms and privacy policies apply to your booking so you must agree to and understand those terms. Furthermore, the terms of the actual provider (airline, hotel, tour operator, etc.) apply to your travel, so you must also agree to and understand those terms. Earthling does not bear any responsibility should anything go wrong with your booking or during your travel. </SmallText>
                    <SmallText>Your interaction with any Hotel Provider or home provider accessed through our Platform is at your own risk, and Earthling does not have any responsibility should anything go wrong with your booking. Earthling has no control over the Hotel Products or Hotel Providers and travel providers. Earthling hosts content, including prices, images and other information, made available by or obtained from (“Provider Content”), as well as content provided by users, such as comments, ratings and other information (“User Content” and together with the Provider Content, the “Content”)</SmallText>
                    <SmallText>Earthling is in no way responsible or liable for the accuracy, quality, completeness, reliability, timeliness or trustworthiness of the Content, and Earthling has no influence over the Content. In particular, we do not guarantee that Provider Content, in particular the prices reflected therein, will be updated in real time or that a particular Hotel Product will be available. As a result, the price displayed by a Hotel Provider may not correspond to that displayed on our Platform. Hotel ratings displayed on this Platform are intended as only general guidelines, and we do not guarantee the accuracy of the ratings or of any User Content.</SmallText>
                    <HeaderText>Using Our Services</HeaderText>
                    <SmallText>You may just utilize “Earthling” services in consistence with applicable laws and for real purposes. In light of you consenting to these terms, we grant you a non-transferable, non-selective permit to download, access and utilize our service for your very own, non-business purposes and for no other reason. </SmallText>
                    <SmallText>We grant this permit subject to you agreeing that you will not:</SmallText>
                    <BulletText>Utilize Earthling service for any reason that is inappropriate, unlawful, or to post, share or transmit any material that:</BulletText>
                    <BulletText type="square" style={{ marginLeft: 50 }}>is abusive, hostile, vulgar or in any case offensive; </BulletText>
                    <BulletText type="square" style={{ marginLeft: 50 }}>is in breach of certainty or protection or of any outsider's privileges including copyright, trade mark or other intellectual property rights;  </BulletText>
                    <BulletText type="square" style={{ marginLeft: 50 }}>is posted, mutual or transmitted to publicize or marketing yourself or any other party; or</BulletText>
                    <BulletText type="square" style={{ marginLeft: 50 }}>Is deceiving or deception regarding your identity or which in any capacity recommends that you are supported, partnered or associated with us. </BulletText>
                    <BulletText>Utilize Earthling services for any business reason or in any way which may make harm us or bring us into offensiveness or disrepute.</BulletText>
                    <BulletText>Duplicate, convey, communicate to people in general, sell, lease, loan or in any case utilize Earthling Service or try to disregard or circumvent any security measure set up to limit your entrance to or use of our services.</BulletText>
                    <BulletText>Utilize or interfere with Earthling services in a manner that could harm, overburden, weaken or damage our system or frameworks or security with other users.</BulletText>
                    <BulletText>use the Earthling platform in connection with the distribution of unsolicited commercial messages ("spam")</BulletText>
                    <BulletText>use any robots, spider, crawler, scraper or other automated means or processes to access, collect data or other content from or otherwise interact with the Earthling Platform for any purpose;</BulletText>
                    <SmallText>When you join to our services sign in record or password, you are liable for keeping those information and sign in private and secure. In the event that you become aware, or suspect under any conditions, that the security of your sign in account has been damaged or compromised, please let us know by means of our support
                            <Text onPress={() => Linking.openURL('mailto:support@earthtravel.online')} style={Styles.fontGilroyBold}> support@earthtravel.online</Text>
                    </SmallText>
                    <HeaderText>We Warn You</HeaderText>
                    <SmallText>You are not allowed to republish data from “Earthling” platform, Sell, rent or sub-license Earthling services, Reproduce, duplicate or copy “Earthling” services. Redistribute content related to “Earthling” services (unless content is specifically made for redistribution).</SmallText>
                    <HeaderText>Description about the services</HeaderText>
                    <SmallText>Earthling endeavors to be as precise as could reasonably be expected. On the off chance that you have motivation to accept that a hotel or any service you booked through the Service or other product or description doesn't meet the cases promoted inside the Service, you should contact Earthling promptly and regardless no later than three business days following the registration date or check in date. Your inability to get in touch with us inside this period may influence our capacity to investigate and resolve your case.</SmallText>
                    <HeaderText>Price Accuracy of Our Services</HeaderText>
                    <SmallText>Your utilization of “Earthling” services is totally at your own risk. </SmallText>
                    <SmallText>Despite the fact that we authorize strict price accuracy with all the supply movement information and put forth a best effort to guarantee that the content showed on or our Services are up to date and exact, we can't ensure the guarantee the reliability or accuracy of such content. Prices can be change without any prior notice. Earthling makes no assurance that the costs publicized through the Service speak to:</SmallText>
                    <SmallText>(I) the less cost for a hotel room or private owned rooms in each zone on a specific day or</SmallText>
                    <SmallText>(ii) the distributed cost for a hotel room or a private owned rooms on another App or publisher not partnered with Earthling in each region on a specific day.</SmallText>
                    <SmallText>Yet there is no assurance that our figures will be right every time. We will not be under no liability whatsoever in respect of any loss or damage arising directly or indirectly out of the declaration of authorization for any transaction for any reason whatsoever.</SmallText>
                    <HeaderText>Booking Through Earthling</HeaderText>
                    <SmallText>At the point when you book any service or utilizing the Service, you are speaking to the accompanying: </SmallText>
                    <BulletText>Provide the credit data which is valid and complete;</BulletText>
                    <BulletText>Charges caused by you will be regarded by your credit card organization and</BulletText>
                    <BulletText>You will pay the posted cost for the hotel room, regardless of whether you can't consummate your stay in that hotel.</BulletText>
                    <SmallText>We won't issue Value Added Taxes solicitations for any buys made through the Service. You are answerable for paying the hotel straightforwardly for any room overhauls or other coincidental charges you make once you are at the hotel.</SmallText>
                    <HeaderText>Damage to Accommodations</HeaderText>
                    <SmallText>As a Visitor or being as a guest, you are answerable for leaving the Accommodation counting any close to home or other property situated at the Accommodation in the condition it was in when you showed up. You are answerable for your own demonstrations and oversights and are likewise liable for the demonstrations and exclusions of any people whom you welcome to, or in any case give access to, the Accommodation, barring the Host. In the event that a Host asserts and gives proof that you as a Guest have suspiciously harmed an Accommodation or any close to home or other property at an Accommodation ("Damage Claim"), the Host can look for installment from you through the Resolution Center. In the event that a Host raises a Damage Claim to Earthling, you will be allowed a chance to react. In the event that you consent to pay the Host, or Earthling decides viable of any material legal standards on the weight of confirmation that you are liable for the Damage Claim, Earthling by means of Earthling Payments will, after the finish of your remain, gather any such entireties from you and additionally against the Security Deposit (if appropriate) required to cover the Damage Claim in accordance with the Payments Terms. Earthling likewise maintains all authority to in any case gather installment from you and seek after any cures accessible to Earthling in such manner in circumstances in which you are answerable for a Damage Claim, including, however not constrained to, according to any installment demands made by Hosts under the Earthling Host Guarantee.</SmallText>
                    <HeaderText>Public Reviews on Our App</HeaderText>
                    <SmallText>Inside a certain time span in the wake of finishing a booking, Guests and Hosts can leave an open review and present a star about one another. Evaluations or Reviews shows the assessments of individual Members and don't reflect the assessment of Earthling. Evaluations and Reviews are not checked via Earthling for exactness and might be not correct or deceiving. Ratings and Reviews by Guests and Hosts must be precise and may not contain any hostile or slanderous language. Members are denied from controlling the Ratings and Reviews framework in any way, for example, asking an outsider to compose a positive or negative Review about another Member. </SmallText>
                    <HeaderText>Taxes/ Duties Fee</HeaderText>
                    <SmallText>You recognize that Earthling offers the Support for a thought ("Facilitation Fee"). The room rate showed on the Application incorporates the room rate we pre-haggled for the room we are saving for your sake and the Facilitation Fee. You are willing that Earthling will charge you at the all-out reservation cost. Aside from as portrayed that the tax recovery amount sum incorporates an expected add up to recoup the sum we pay the hotel for charges owed by the hotel , including, without impediment, deals and use charge, inhabitance charge, room charge, extract charge, esteem included assessment and different expenses. In certain cities, the tax sum may incorporate government forced expenses or different charges not paid directly to a government authority yet at the same time legally necessary. The amount paid to the hotel for charges owed by the hotel may differ from the tax we gauge. The equalization of the tax included under "Duties and Fees" is an expense we hold as a major aspect of the remuneration for our administrations and to take care of the expenses of your booking, including client care costs. The sums for Taxes and Fees changes dependent on various components including, without restriction, the amount we pay the hotel and the area of the hotel, and may incorporate benefit we hold. Where relevant, our hotel suppliers decide all applicable taxes/duties in the amount we are required to pay over to them. </SmallText>
                    <HeaderText>Indemnity</HeaderText>
                    <SmallText>Important: THIS CLAUSE CONTAINS PROVISIONS WHICH RESTRICT THE EXTENT TO WHICH YOU ARE LIABLE TO THE US FOR ANY LOSS WE MAY SUFFER IN CONNECTION WITH THE GOODS. PLEASE READ IT CAREFULLY AND DO NOT MAKE AN OFFER TO PURCHASE THE SERVICES UNLESS YOU AGREE TO THIS CLAUSE.</SmallText>
                    <SmallText>You agree that you shall be liable for, and hereby agree to indemnify the business on demand in respect of any and all demands, liabilities, losses, costs and claims (including reasonable legal fees) sustained or incurred by us, its agents, suppliers, resellers, its customers, officers or employees and arising as a result of breach by you of this Agreement</SmallText>
                    <HeaderText>Access and Use of the Platform</HeaderText>
                    <SmallText>The Platform is currently made available to you for your personal, non-commercial use, free of charge. We do not guarantee that access to the Platform, or any content on it, will always be available or be uninterrupted. We may suspend, withdraw, discontinue or change all or any part of the Platform without notice to you. You must not misuse the Platform by knowingly introducing viruses, worms, logic bombs or any other material which is malicious or technologically harmful. You must not attempt to gain unauthorized access to the Platform, the server on which the Platform is stored or any server, computer or database connected to the Platform. You must not attack the Platform via a denial-of-service attack or a distributed denial-of service attack. We will report any such breach to the relevant law enforcement authorities and we will co-operate with those authorities by disclosing your identity to them. In the event of such a breach, your right to use the Platform will cease immediately.</SmallText>
                    <HeaderText>User Comments</HeaderText>
                    <SmallText>This Agreement shall begin on the date hereof.</SmallText>
                    <SmallText>Certain parts offer the opportunity for users to post and exchange opinions, you send inventive thoughts, recommendations, proposition, plans, or different materials, regardless of whether on the App, by email, or something else (aggregate, 'remarks'), information, material and data ('Comments'). We do not screen, edit, and publish or review Comments or remarks prior to their appearance and Comments or remarks do not reflect the views or opinions of us. Comments reflect the view and opinion of the person who posts such view or opinion. To the extent permitted by applicable laws we are not be responsible or liable for the Comments or for any loss cost, liability, damages or expenses caused and or suffered as a result of any use of and/or posting of and/or appearance of the Comments or remark. </SmallText>
                    <SmallText>We reserves the right to monitor all remarks, we do not pay your for your remark and to remove any remarks which it considers in its absolute discretion to be inappropriate, offensive or otherwise in breach of these Terms and Conditions. You are entitled to post the remark and have all necessary licenses and consents to do so; The Comments or remakes do not infringe any intellectual property right, including without limitation copyright, patent or trademark, or other proprietary right of any third party; The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material or material which is an invasion of privacy. The remarks will not be used to solicit or promote business or custom or present commercial activities or unlawful activity. </SmallText>
                    <HeaderText>Termination</HeaderText>
                    <SmallText>Earthling may in its absolute discretion immediately terminate any agreement with you under these Terms at any time upon notice to you and/or, by cancelling your membership and your access to your account and removing any User Content you have uploaded to our service or platform. We may suspend your access and use in whole or in part without notice at any time, for example to prevent you from uploading any User Content, without incurring any liability to you whatsoever.</SmallText>
                    <HeaderText>Unethical Activities</HeaderText>
                    <SmallText>We maintain all authority to examine protests or revealed infringement of these Terms and to make any move we are deem proper, including, however not limited to, and detailing any speculated unlawful action to law authorization authorities, controllers or other third parties.</SmallText>
                    <HeaderText>Reserve of Rights</HeaderText>
                    <SmallText>All rights not expressly granted in these terms are reserved to us. Nothing contained in these terms shall be construed as conferring by implication, otherwise any license or right under any copyright, patent, trademark or other intellectual property right of us or any other person or to you.</SmallText>
                    <HeaderText>Host Services and Booking Know-how</HeaderText>
                    <SmallText>Before and during an Experience, Event or other Host Service you should consistently stick to the Hosts' guidelines. You may not carry any extra people to an Experience, Event or other Host Service except if such an individual was included by you as an extra visitor during the booking procedure on the Earthling Platform. You ought to deliberately check the description of any Experience, Event or other Host Service you mean to book to guarantee you (and any extra visitors you are reserving for) meet any base age, capability, wellness or different prerequisites which the Host has determined in their Listing. At your sole caution you might need to tell the Host regarding any clinical or states of being, or different conditions that may affect your and any extra visitor's capacity to partake in any Experience, Event or other Host Service. </SmallText>
                    <HeaderText>About Third Party</HeaderText>
                    <SmallText>Your utilization of the Service and your contact, connection or dealings with any outsiders or third party emerging out of your utilization of the Service is exclusively at your own risk. The hotels, private owned home and different providers of Earthling are self-employed entities and not specialists or representatives of Earthling. Earthling isn't answerable for, and won't be held liable, for the demonstrations, mistakes, exclusions, portrayals, guarantees, breaks or carelessness of any of these hotels or providers for any personal wounds, demise, property harm, misfortune, burglary or different harms or costs coming about in this manner</SmallText>
                    <HeaderText>Removal of links</HeaderText>
                    <SmallText>If you find any link attached to our services or on App are objectionable for any reason, you may contact us about this at<Text onPress={() => Linking.openURL('mailto:support@earthtravel.online')} style={Styles.fontGilroyBold}> support@earthtravel.online</Text>. We will consider requests to remove links but will have no obligation to do so or to respond directly to you. Whilst we endeavor to ensure that the information we hold is correct, we do not warrant its completeness or accuracy; nor do we commit to ensuring that the info remains available or that the material or services are kept up to date.</SmallText>
                    <HeaderText>Limitation of Liability</HeaderText>
                    <SmallText>Earthling do not be liable for any damage, direct or indirect, incidental or consequential, for use of or inability to use our services of any kind that is offered or to provide indemnity or any other remedy to you or any third party. Earthling make every effort to ensure that our services are free from defects or viruses. It is your responsibility to ensure that you use the correct service when using the App/site, and to protect from anything that may damage it and we are not be liable for any damage, direct or indirect, incidental or consequential, by use of this site to you or your computer or any equipment, software used by you.</SmallText>
                    <HeaderText>Changes To Terms / Severability</HeaderText>
                    <SmallText>Earthling may modify, update or otherwise change the terms applicable to our services from time to time. Following the posting of such change, your continued use of this App will constitute your acceptance of the terms, as modified. If any one of these terms shall be deemed invalid, void, or for any reason unenforceable, such terms shall be deemed severable and shall not affect the validity and enforceability of remaining terms. We reserves the right to update or modify these Terms & Conditions at any time without prior notice. Any changes will become effective upon posting. It is your responsibility to check this page periodically for changes. Your continued use of or access to our services following the posting of any changes constitutes acceptance of those changes.</SmallText>
                    <HeaderText>Contact Information</HeaderText>
                    <SmallText>Concerns or questions about this Terms and Conditions can be directed to for <Text onPress={() => Linking.openURL('mailto:support@earthtravel.online')} style={Styles.fontGilroyBold}> support@earthtravel.online</Text> further clarification.</SmallText>
                </ScrollView>
            </View >
        );

    }
}

const mapStateToProps = state => {
    return {
        userID: state.userID
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateState: (payload) => dispatch({
            type: 'UPDATE_STATE',
            payload: payload
        })
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TermsOfService);
