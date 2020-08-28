export default password => {
    if(_.isNull(password) || !_.isString(password) || _.isEmpty(password))
        return false;

    if(false === /[A-Z]/.test(password))
        return false;

    if(false === /\d/.test(password))
        return false;

    return true;
};
