module.exports = {
  int(min, max) {  
    return Math.floor(
      Math.random() * (max - min + 1) + min
    );
  },
  string(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let result = '';
    while (length--) result += characters.charAt(Math.floor(Math.random() * charactersLength));
    return result;
  }
};
