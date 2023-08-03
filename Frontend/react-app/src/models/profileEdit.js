
export class ProfileEdit {
    constructor(obj) {
      this.username = obj.username;
      this.password = obj.password;
      this.newPassword = obj.newPassword;
      this.email = obj.email;
      this.firstName = obj.firstName;
      this.lastName=obj.lastName;
      this.birthday = obj.birthday;
      this.address = obj.address;
      this.image = obj.image;
      this.imageFile = obj.imageFile;
    }
  }