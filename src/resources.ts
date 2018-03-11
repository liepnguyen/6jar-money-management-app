export const images = {
  get ['education_account_avatar.jpg']() { return require('../assets/images/education_account_avatar.jpg'); },
  get ['play_account_avatar.jpg']() { return require('../assets/images/play_account_avatar.jpg'); },
  get ['longterm_saving_for_spending_account_avatar.jpg']() { return require('../assets/images/longterm_saving_for_spending_account_avatar.jpg'); },
  get ['financial_freedom_account_avatar.jpg']() { return require('../assets/images/financial_freedom_account_avatar.jpg'); },
  get ['necessity_account_avatar.jpg']() { return require('../assets/images/necessity_account_avatar.jpg'); },
  get ['give_account_avatar.jpg']() { return require('../assets/images/give_account_avatar.jpg'); },
  icons: {
    get ['no_icon.png']() { return require('../assets/images/icons/no_icon.png'); },
    get ['shopping.png']() { return require('../assets/images/icons/shopping.png'); },
    get ['education.png']() { return require('../assets/images/icons/education.png'); },
    get ['family.png']() { return require('../assets/images/icons/family.png'); },
    get ['fees_and_charges.png']() { return require('../assets/images/icons/fees_and_charges.png'); },
    get ['food_and_beverage.png']() { return require('../assets/images/icons/food_and_beverage.png'); },
    get ['gifts_and_donations.png']() { return require('../assets/images/icons/gifts_and_donations.png'); },
    get ['health_and_fitness.png']() { return require('../assets/images/icons/health_and_fitness.png'); },
    get ['insurances.png']() { return require('../assets/images/icons/insurances.png'); },
    get ['investment.png']() { return require('../assets/images/icons/investment.png'); },
    get ['travel.png']() { return require('../assets/images/icons/travel.png'); },
    get ['entertainment.png']() { return require('../assets/images/icons/entertainment.png'); },
    get ['friends_and_lover.png']() { return require('../assets/images/icons/friends_and_lover.png'); },
    get ['bills_and_utilities.png']() { return require('../assets/images/icons/bills_and_utilities.png'); },
    get ['transportation.png']() { return require('../assets/images/icons/transportation.png'); },
    get ['others.png']() { return require('../assets/images/icons/others.png'); },
    get ['gifts.png']() { return require('../assets/images/icons/gifts.png'); },
    get ['selling.png']() { return require('../assets/images/icons/selling.png'); },
    get ['interest_money.png']() { return require('../assets/images/icons/interest_money.png'); },
    get ['salary.png']() { return require('../assets/images/icons/salary.png'); },
    get ['award.png']() { return require('../assets/images/icons/award.png'); },
    get ['jar_money.png']() { return require('../assets/images/icons/jar_money.png') },
    get ['account_money.png']() { return require('../assets/images/icons/account_money.png') },
    get ['question_mark.png']() { return require('../assets/images/icons/question_mark.png') },
    get ['custom_icon.png']() { return require('../assets/images/icons/custom_icon.png') },
  }
}

export const loadIcon = (fileName, option = { default: 'no_icon.png' }) => {
  return images.icons[fileName] || images.icons[option.default];
}

export const loadImage = (filename) => {
  return images[filename];
}
