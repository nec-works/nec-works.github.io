function FormChecker(checkForm) {
	this.checkForm = checkForm;
	this.validatorList = new Array();
};

FormChecker.prototype.checkRequired = function(fieldName, errorMessage, focus) {
	this.validatorList.push(new RequiredValidator(this.checkForm, fieldName, errorMessage, focus));
};

FormChecker.prototype.checkMaxLength = function(fieldName, maxLength, errorMessage, focus) {
	this.validatorList.push(new MaxLengthValidator(this.checkForm, fieldName, maxLength, errorMessage, focus));
};

FormChecker.prototype.checkMaxLengthByte = function(fieldName, maxLength, errorMessage, focus) {
	this.validatorList.push(new MaxLengthByteValidator(this.checkForm, fieldName, maxLength, errorMessage, focus));
};

FormChecker.prototype.checkMinLength = function(fieldName, minLength, errorMessage, focus) {
	this.validatorList.push(new MinLengthValidator(this.checkForm, fieldName, minLength, errorMessage, focus));
};

FormChecker.prototype.checkMinLengthByte = function(fieldName, minLength, errorMessage, focus) {
	this.validatorList.push(new MinLengthByteValidator(this.checkForm, fieldName, minLength, errorMessage, focus));
};

FormChecker.prototype.checkRegex = function(fieldName, regex, errorMessage, focus) {
	this.validatorList.push(
		new RegexValidator(this.checkForm, fieldName, regex, errorMessage, focus));
};

FormChecker.prototype.checkAlphaNum = function(fieldName, errorMessage, focus) {
	this.validatorList.push(
		new RegexValidator(this.checkForm, fieldName,
			/^[a-zA-Z0-9]+$/, errorMessage, focus));
};

FormChecker.prototype.checkOnlyNumber = function(fieldName, errorMessage, focus) {
	this.validatorList.push(
		new RegexValidator(this.checkForm, fieldName,
			/^[0-9]+$/, errorMessage, focus));
};

FormChecker.prototype.checkDecimal = function(fieldName, errorMessage, focus) {
	this.validatorList.push(
		new RegexValidator(this.checkForm, fieldName,
			/^(\-)?[0-9]*(\.[0-9]*)?$/, errorMessage, focus));
};

FormChecker.prototype.checkEmail = function(fieldName, errorMessage, focus) {
	this.validatorList.push(
		new RegexValidator(this.checkForm, fieldName,
			/^((\w|[\-\.])+)@((\w|[\-\.])+)\.([A-Za-z]+)$/, errorMessage, focus));
};

FormChecker.prototype.checkSelected = function(fieldName, firstIdx, errorMessage, focus) {
	this.validatorList.push(new SelectionValidator(this.checkForm, fieldName, firstIdx, errorMessage, focus));
};

FormChecker.prototype.checkAtLeastOneChecked = function(fieldName, errorMessage, focus) {
	this.validatorList.push(new AtLeastOneCheckValidator(this.checkForm, fieldName, errorMessage, focus));
};

// 특수 문자 사용 여부
FormChecker.prototype.checkSpecialChar = function(fieldName, errorMessage, focus) {
    this.validatorList.push(new SpecialCharCheckValidator(this.checkForm, fieldName,  errorMessage, focus));
};

FormChecker.prototype.checkDiffValue = function(fieldName, compareValue, minLength, errorMessage, focus) {
	this.validatorList.push(new DiffValueValidator(this.checkForm, fieldName, compareValue, minLength, errorMessage, focus));
};

FormChecker.prototype.validate = function() {
	for (var vali = 0 ; vali < this.validatorList.length ; vali ++ ) 
	{
		validator = this.validatorList[vali];
		
		if (validator.validate() == false) 
		{
			alert(validator.getErrorMessage());
			
			//maxLength 속성이 있을 경우 maxLength 까지만 자름...
			if(validator.hasOwnProperty("maxLength")){
				this.checkForm[validator.getFieldName()].value = (this.checkForm[validator.getFieldName()].value).substring(0,validator.maxLength);
			}
			
			if (validator.isFocus() == true) {
				this.checkForm[validator.getFieldName()].focus();
			}
			
			return false;
		}
	}
	return true;
};

FormChecker.prototype.getForm = function() {
	return this.checkForm;
};

// Validator is base class of all validators
function Vaildator() {
}

Vaildator.prototype.getFieldName = function() {
	return this.fieldName;
};

Vaildator.prototype.getErrorMessage = function() {
	return this.errorMessage;
};

Vaildator.prototype.isFocus = function() {
	return this.focus;
};

// required validator
function RequiredValidator(form, fieldName, errorMessage, focus) {
	this.form = form;
	this.fieldName = fieldName;
	this.errorMessage = errorMessage;
	this.focus = focus;
}

RequiredValidator.prototype = new Vaildator;
RequiredValidator.prototype.validate = function() {
	return this.form[this.fieldName].value.replace(/\s/g,'') != '';
};

// max length validator
function MaxLengthValidator(form, fieldName, maxLength, errorMessage, focus) {
	this.form = form;
	this.fieldName = fieldName;
	this.errorMessage = errorMessage;
	this.focus = focus;
	this.maxLength = maxLength;
}

MaxLengthValidator.prototype = new Vaildator;
MaxLengthValidator.prototype.validate = function() {
	return this.form[this.fieldName].value.length <= this.maxLength;
};

// max length(byte) validator
function MaxLengthByteValidator(form, fieldName, maxLength, errorMessage, focus) {
	this.form = form;
	this.fieldName = fieldName;
	this.errorMessage = errorMessage;
	this.focus = focus;
	this.maxLength = maxLength;
}

MaxLengthByteValidator.prototype = new Vaildator;
MaxLengthByteValidator.prototype.validate = function() {
	str = this.form[this.fieldName].value;
	return(str.length+(escape(str)+"%u").match(/%u/g).length-1) <= this.maxLength;
};

// min length validator
function MinLengthValidator(form, fieldName, minLength, errorMessage, focus) {
	this.form = form;
	this.fieldName = fieldName;
	this.errorMessage = errorMessage;
	this.focus = focus;
	this.minLength = minLength;
}

MinLengthValidator.prototype = new Vaildator;
MinLengthValidator.prototype.validate = function() {
	return this.form[this.fieldName].value.length >= this.minLength;
};

// min length(byte) validator
function MinLengthByteValidator(form, fieldName, minLength, errorMessage, focus) {
	this.form = form;
	this.fieldName = fieldName;
	this.errorMessage = errorMessage;
	this.focus = focus;
	this.minLength = minLength;
}

MinLengthByteValidator.prototype = new Vaildator;
MinLengthByteValidator.prototype.validate = function() {
	str = this.form[this.fieldName].value;
	return(str.length+(escape(str)+"%u").match(/%u/g).length-1) >= this.minLength;
};

// regex pattern validator
function RegexValidator(form, fieldName, regex, errorMessage, focus) {
	this.form = form;
	this.fieldName = fieldName;
	this.regex = regex;
	this.errorMessage = errorMessage;
	this.focus = focus;
};

RegexValidator.prototype = new Vaildator;
RegexValidator.prototype.validate = function() {
	var str = this.form[this.fieldName].value;
	if (str.length == 0) return true;
	return str.search(this.regex) != -1;
};

// check selected
function SelectionValidator(form, fieldName, firstIdx, errorMessage, focus) {
	this.form = form;
	this.fieldName = fieldName;
	this.firstIdx = firstIdx;
	this.errorMessage = errorMessage;
	this.focus = focus;
}

SelectionValidator.prototype = new Vaildator;
SelectionValidator.prototype.validate = function() {
	var idx = this.form[this.fieldName].selectedIndex;
	return idx >= this.firstIdx;
};

// check checkbox checked
function AtLeastOneCheckValidator(form, fieldName, errorMessage, focus) {
	this.form = form;
	this.fieldName = fieldName;
	this.errorMessage = errorMessage;
	this.focus = focus;
}

AtLeastOneCheckValidator.prototype = new Vaildator;
AtLeastOneCheckValidator.prototype.validate = function() {
	ele = this.form[this.fieldName];
	if (typeof(ele[0]) != "undefined") {
		// 2~
		for (var idxe = 0 ; idxe < ele.length ; idxe++) {
			if (ele[idxe].checked == true) {
				return true;
			}
		}
		return false;
	} else {
		// only 1
		return ele.checked == true;
	}
};

// 특수 문자 검사
function SpecialCharCheckValidator(form, fieldName, errorMessage, focus) {
    this.form = form;
    this.fieldName = fieldName;
    this.errorMessage = errorMessage;
    this.focus = focus;
};

SpecialCharCheckValidator.prototype = new Vaildator;
SpecialCharCheckValidator.prototype.validate = function() {

    //var strPattern = /['~!@\#$%^&*\()\=+']/gi;
	var strPattern = /['~@\#$%^&*\()\=+']/gi;

    if (strPattern.test(this.form[this.fieldName].value)) {
        return false;
    }else{
        return true;
    }
};

// 비밀번호 영문과 숫자 혼용 사용체크
function NumEngMixValidator(form, fieldName, errorMessage, focus) {
	this.form = form;
	this.fieldName = fieldName;
	this.errorMessage = errorMessage;
	this.focus = focus;
};

NumEngMixValidator.prototype = new Vaildator;
NumEngMixValidator.prototype.validate = function() {
	ele = this.form[this.fieldName];
	chk1 = /^[a-z\d]{4,12}$/i;  //a-z와 0-9이외의 문자가 있는지 확인
    chk2 = /[a-z]/i;  //적어도 한개의 a-z 확인
    chk3 = /\d/;  //적어도 한개의 0-9 확인
	return chk1.test(ele.value)&&chk2.test(ele.value)&&chk3.test(ele.value);
};

// 비밀번호 아이디와 일치여부 체크
function PassIdMatchValidator(form, fieldName, idFieldName,errorMessage, focus) {
	this.form = form;
	this.fieldName = fieldName;
	this.idFieldName = idFieldName;
	this.errorMessage = errorMessage;
	this.focus = focus;
};

PassIdMatchValidator.prototype = new Vaildator;
PassIdMatchValidator.prototype.validate = function() {
	ele = this.form[this.fieldName];
	ele2=this.form[this.idFieldName];
	if(ele.value==ele2.value){
		return false;
	}
	return true;
};

// 비밀번호 연속, 동일 문자 여부 체크
function CharOrderValidator(form, fieldName,errorMessage, focus) {
	this.form = form;
	this.fieldName = fieldName;
	this.errorMessage = errorMessage;
	this.focus = focus;
};

CharOrderValidator.prototype = new Vaildator;
CharOrderValidator.prototype.validate = function() {
	ele = this.form[this.fieldName];
	var result = true;
	var checkStr = ""; // 같은 반복문자 체크(예: aaaa)
	var checkAsc = ""; // 연속된 오름차순 숫자 혹은 문자(예: abcde)
	var checkDesc = ""; // 연속된 내림차순 숫자 혹은 문자(예: edcba)

	for(var z=1; z<3; z++){
		checkStr  += "ele.value.charAt(i) == ele.value.charAt(i + " + z + ")";
		checkAsc  += "(ele.value.charCodeAt(i) + " + z + ") == ele.value.charCodeAt(i + " + z + ")";
		checkDesc += "(ele.value.charCodeAt(i) - " + z + ") == ele.value.charCodeAt(i + " + z + ")";
		if(z < 3 - 1){
			checkStr  += " && ";
			checkAsc  += " && ";
			checkDesc += " && ";
		}
	}

	for (var i=0; i<ele.value.length - 2; i++) {
		if (eval(checkStr) || eval(checkAsc) || eval(checkDesc)) {
			result = false;
		}
		return result;
	}
};

// 문자열간의 불일치 검사
function DiffValueValidator(form, fieldName, compareValue, errorMessage, focus) {
    this.form = form;
    this.fieldName = fieldName;
    this.compareValue = compareValue;
    this.errorMessage = errorMessage;
    this.focus = focus;
};

DiffValueValidator.prototype = new Vaildator;
DiffValueValidator.prototype.validate = function() {
    if (this.form[this.fieldName].value!=this.compareValue) {
        return false;
    } else {
        return true;
    }
};
