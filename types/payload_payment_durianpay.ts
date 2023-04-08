export interface PayloadPaymentDurianPay {
    data: Data
}

export interface Data {
    type: string
    response: Response
}

export interface Response {
    payment_id: string
    order_id: string
    account_number: string
    expiration_time: string
    paid_amount: string
    payment_instruction: PaymentInstruction
}

export interface PaymentInstruction {
    en: En
    id: Id
}

export interface En {
    atm: Atm
    mobile_app: MobileApp
}

export interface Atm {
    heading: string
    instruction_text: string
}

export interface MobileApp {
    heading: string
    appstore_url: string
    playstore_url: string
    instruction_text: string
}

export interface Id {
    atm: Atm2
    mobile_app: MobileApp2
}

export interface Atm2 {
    heading: string
    instruction_text: string
}

export interface MobileApp2 {
    heading: string
    appstore_url: string
    playstore_url: string
    instruction_text: string
}
