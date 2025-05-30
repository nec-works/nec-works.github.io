var _newDate = new Date();
var _currYear = _newDate.getFullYear();

var DateUtil = {

	getCurrYear : function() {
		return _currYear;
	}

};

function makeDateFormat( pdate, vType ) {
	var yyyy, yy, mm, dd, yymmdd, yyyymm, rVal;
	var ar;

	if ( vType == null )
		vType = '.';

	if ( pdate.length < 8 ) {
		return "";
	}
	//alert(pdate);

	if ( pdate.indexOf( "." ) > -1 ) { // yyyy.mm.dd
		ar = pdate.split( "." );
		yyyy = ar[0];
		mm = ar[1];
		dd = ar[2];

		if ( mm < 10 )
			mm = "0" + mm;
		if ( dd < 10 )
			dd = "0" + dd;
	} else if ( pdate.indexOf( "-" ) > -1 ) {// yyyy-mm-dd
		ar = pdate.split( "-" );
		yyyy = ar[0];
		mm = ar[1];
		dd = ar[2];

		if ( mm < 10 )
			mm = "0" + mm;
		if ( dd < 10 )
			dd = "0" + dd;
	} else if ( pdate.length >= 7 ) {
		yyyy = pdate.substr( 0, 4 );
		mm = pdate.substr( 4, 2 );
		dd = pdate.substr( 6, 2 );
	}

	//console.log( "yyyy:" + yyyy );
	if ( yyyy.length < 4 ) {
		return "";
	}

	yy = yyyy.substr( 2, 4 );

	if ( vType == 'date' ) {
		yyyymmdd = yyyy + "/" + mm + "/" + dd;
		yyyymmdd = new Date( yyyymmdd );

		if ( isNaN( yyyymmdd ) ) {
			return false;
		}
		rVal = yyyymmdd
	} else {
		yymmdd = yy + vType + mm + vType + dd;
		rVal = yymmdd;
	}

	return rVal;
}
