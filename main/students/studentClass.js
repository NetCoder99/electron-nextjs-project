export class StudentFields {
  constructor(
    badgeNumber = -1,
    firstName   = '',
    middleName  = '',
    lastName    = '',
    namePrefix  = '',
    email       = '',
    address     = '',
    address2    = '',
    city        = '',
    country     = '',
    state       = '',
    zip         = '',
    birthDate   = '',
    phoneHome   = '',
    phoneMobile = '',
    status      = '',
    memberSince = '',
    gender      = '',
    currentRank = '',
    ethnicity   = '',
    imageSrc    = '/misc_images/RSM_Logo2.jpg',
    imageName   = '',
    imagePath   = '',
    imageString = '',
    firstNameClass  = '',
    middleNameClass = '',
    lastNameClass   = '',
    birthDateClass  = '',
    saveResult  = '',
    saveMessage = '',
  ) {
    this.badgeNumber = badgeNumber;
    this.firstName   = firstName;
    this.middleName  = middleName;
    this.lastName    = lastName;
    this.namePrefix  = namePrefix;
    this.email       = email;
    this.address     = address;
    this.address2    = address2;
    this.city        = city;
    this.country     = country;
    this.state       = state;
    this.zip         = zip;
    this.birthDate   = birthDate;
    this.phoneHome   = phoneHome;
    this.phoneMobile = phoneMobile;
    this.status      = status;
    this.memberSince = memberSince;
    this.gender      = gender;
    this.currentRank = currentRank;
    this.ethnicity   = ethnicity;
    this.imageSrc    = imageSrc;
    this.imageName   = imageName;
    this.imagePath   = imagePath;
    this.imageString = imageString;
    this.firstNameClass  = firstNameClass;
    this.middleNameClass = middleNameClass;
    this.lastNameClass   = lastNameClass;
    this.birthDateClass  = birthDateClass;
    this.saveResult  = saveResult;
    this.saveMessage = saveMessage;
  }
  toJson() {
    return JSON.stringify(this);
  }
}
