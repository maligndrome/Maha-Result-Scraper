//var checkOK = "PNRMXVSTW";
var level=0;
	var globCtr=0;
	var maxPages=50;
	var link='http://mahresult.nic.in/hsc2016/resultview16.asp';
	//var roll=268645;
	var file = "data:text/plain;charset=utf-8,";
	var logFile = '';
	var commonNames=['sha','ana','ani','sun','shr','bha','git','shi','san','anj','dev','sar','sar','mee','ami','sum','lat','sur','sav','man','see','cha','sho','mal','jyo','ama','lax','ila','ush','she','ant','nee','ash','mad','esh','ind','aru','chi','var','pri','par','ava','poo','vij','anu','vid','nis','dee','dip','vim','lal','art','swa','ano','ank','pra','uma','chh','kir','son','lee','sul','tar','jay','sad','rad','amr','abh','roh','nit','aka','may','sam','sus','rat','pal','aar','vas','rit','vin','sud','dha','kun','raj','mon','pre','kal','lav','nik','pad','kam','ruk','kaj','sit','tri','rup','adi','ish','ras','nil','moh','kau','sak','pur','muk','sat','sah','shy','gau','yam','ksh','div','bal','dur','ais','che','riy','rac','kum','jas','ram','yas','sri','ran','mir','kan','dam','dar','tab','pun','day','aas','val','res','kis','kri','kru','lil','vai','ris','kar','arc','lak','med','kai','rud','pus','sas','gop','ahs','ree','mou','lel','gow','yag'];
	scrapeDataCommon = function(roll) {
		$.post('http://mahresult.nic.in/hsc2016/resultview16.asp',
			{regno:'M'+roll,mname:commonNames[globCtr]}, 
			function(data){
				if(data.indexOf('bg-danger')>-1){
					if(globCtr==153) {
						logFile+=('##'+roll+'##')+'Not found';
						globCtr=0;
						if(--maxPages){scrapeDataCommon(++roll);}
						else {
					    var encoded = encodeURIComponent(logFile);
					    var a = document.createElement('a');
					    a.href = file+encoded;
					    a.target   = '_blank';
					    a.download = 'data-from-'+(roll-50)+'-to-'+roll;
					    document.body.appendChild(a);
					    a.click();
					    a.remove();
					    globCtr=0;
					    maxPages=50;
					    logFile='';
					    scrapeDataCommon(++roll);
					}
					} else {
						++globCtr;
						scrapeDataCommon(roll);
					}
				}else{
					logFile+=('##'+commonNames[globCtr]+':'+roll+'##')+(data.slice(3011,data.indexOf('</table>')));
					logFile+=('$$$$$');
					globCtr=0;
					if(--maxPages){scrapeDataCommon(++roll);}
					else {
					    var encoded = encodeURIComponent(logFile);
					    var a = document.createElement('a');
					    a.href = file+encoded;
					    a.target   = '_blank';
					    a.download = 'data-from-'+(roll-50)+'-to-'+roll;
					    document.body.appendChild(a);
					    a.click();
					    a.remove();
					    globCtr=0;
					    maxPages=50;
					    logFile='';
					    scrapeDataCommon(++roll);
					}
				}
			}
		).fail(function(){
			var globCtr=0;
			var maxPages=50;
			scrapeDataCommon(roll);
		});
	};
