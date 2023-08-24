import { StyleSheet } from 'react-native';
import { defaultColors } from '../components/Common';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 25,
        paddingVertical: 25

    },
    formGroup: {
        flexDirection: 'row'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',

    },
    buttonStyle: {
        backgroundColor: '#1bcbbb',
        borderColor: '#1bcbbb',
        borderRadius: 50,
        width: '80%',
        marginVertical: 30,
        marginHorizontal: 40
    },
    fontGilroyBold: {
        fontFamily: "Gilroy-ExtraBold"
    },
    fontGilroyLight: {
        fontFamily: "Gilroy-Light"
    },
    inputTextContainer: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        height: 45
    },
    inputContainerStyle: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#E0E0E0',
        marginVertical: 15,
        marginHorizontal: -10,
        height: 45
    },
    inputContainerStyles: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'blue',
        marginVertical: 15,
        marginHorizontal: -10,
        height: 45
    },
    inputStyle: {
        paddingHorizontal: 15,
        fontSize: 12
    },
    OverlayTextMainSubject: {
        fontSize: 18,
        color: '#333',
        marginBottom: 20
    },
    OverlayTexts: {
        fontSize: 14,
        color: '#333',
        marginBottom: 20
    },
    pageTitle: {
        paddingTop: 20,
        paddingBottom: 5,
        color: '#333',
        fontSize: 20
    },
    mediumText: {
        fontSize: 16,
        color: '#000',
        marginBottom: 10
    },
    mediumTexts: {
        fontSize: 16,
        color: '#484848',
        marginBottom: 5,

    },
    smallText: {
        color: '#333333',
        fontSize: 14,
        lineHeight: 18
    },
    smallTexts: {
        color: '#484848',
        fontSize: 14,
        lineHeight: 18,

    },
    borderBottom: {
        borderBottomColor: '#e6e6e6',
        borderBottomWidth: 1,
        paddingBottom: 30
    },
    btnLogin: {
        borderRadius: 20,
        backgroundColor: "#1CB9B2",
        borderColor: '#DADADA',
        paddingVertical: 10,
        marginVertical: 18,
        marginBottom: 20
    },
    btnInfo: {
        borderRadius: 20,
        backgroundColor: "#fff",
        borderColor: "#1CB9B2",
        borderWidth: 1
    },
    linearGradient: {
        borderRadius: 20,
        backgroundColor: "#1CB9B2",
        borderColor: '#DADADA',
        paddingVertical: 10,
        marginVertical: 18,
        marginBottom: 20
    },
    buttonText: {
        fontSize: 18,
        textAlign: 'center',
        margin: 0,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
    TitlePage: {
        fontSize: 20,
        color: '#333'
    },
    TitleContainer: {
        paddingVertical: 15,
    },
    textHeader: {
        fontSize: 25,
        marginVertical: 25,
        color: '#333'
    },
    editTextlink: {
        fontWeight: 'bold',
        color: '#F57D22'
    },
    selectInput: {
        marginHorizontal: 1,
        justifyContent: 'center',
        justifyContent: 'flex-end',
        padding: 12,
        paddingLeft: 15
    },
    focusedInput: {
        borderColor: '#F9DF90'
    },
    focusedInputs: {
        borderColor: '#4A6CA3',
    },
    textInput: {
        paddingHorizontal: 15,
        fontSize: 12
    },
    tipText: {
        color: '#0FAB9F'
    },
    containerStyles: {
        height: 50,
    },
    bottomAction: {
        justifyContent: 'flex-end',
        borderTopWidth: .5,
        borderColor: '#EBEBEB',
        paddingHorizontal: 20,
    },
    close: {
        position: 'absolute',
        top: 10,
        right: 10,
        color: 'white',
    },
    unpressedAmenities: {
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        padding: 8
    },
    pressedAmenities: {
        borderColor: '#ffa500',
        borderWidth: 1,
        borderRadius: 10,
        padding: 8
    },
    messageCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderWidth: .5,
        borderColor: 'gainsboro',
        padding: 15,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 4
    },
    messageCardPending: {
        borderColor: '#0BBCB2',
    },
    dot: {
        width: 5,
        height: 5,
        backgroundColor: '#000',
        borderRadius: 20
    },
    actionButtons: {
        borderRadius: 5,
        borderColor: defaultColors(1),
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 5
    },
    sectionHeader: {
        fontSize: 20,
        color: '#222',
        marginBottom: 5
    }
});
