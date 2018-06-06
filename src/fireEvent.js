// Function to get anonymous_id from cookie
function getAnonymousId(){
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  
  if(document.cookie.match(/hk01_annonymous_id/)){
    return(document.cookie.match(/hk01_annonymous_id=([\w\-]+)/)[1]);
  }else{
    var temp_uid = s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
    var d = new Date();
    d.setTime(d.getTime() + (3650*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = "hk01_annonymous_id=" + temp_uid + ";" + expires + 
      ";path=/;domain=." + window.location.host.match(/([^\.]+(\.[^\.]+)?)$/)[1];
    return(temp_uid);
  }
}

// Initialize the tracker client
var myTracker = new trackerClient({
  GA: {
      trackingId: "UA-70981149-9"  // replace with your tracking ID
    },
    Piwik: {
      trackingUrl: "https://track.hktester.com/v1web/piwik.php",  // replace with your piwik tracking url
      siteId: 5,  // replace with your piwik site ID
      userId: getAnonymousId(), // replace with user ID, should be same as MEMBER_ID/ANONYMOUS_ID
      isSPA: true // if the page is single page application
    }
}, false);

/* Config the selected article detail */
const page_path = "/港聞/163141/-%E9%A0%90%E7%AE%97%E6%A1%882018-01%E8%A8%88%E7%A8%85%E6%A9%9F-%E9%99%B3%E8%8C%82%E6%B3%A2%E6%B8%9B%E7%A8%85%E5%B9%AB%E4%BD%A0%E6%85%B3%E5%B9%BE%E5%A4%9A-%E5%8D%B3%E5%88%BB%E5%85%A5%E5%9A%9F%E8%A8%88%E8%A8%88-";
const author = "\u856d\u8f1d\u6d69, \u7c21\u6d69\u5fb7";  // 蕭輝浩, 簡浩德
const channel = "\u65b0\u805e"; // 新聞
const section = "\u65b0\u805e"; // 新聞
const article_id = "163141";


function fire_custom_url (url) {
  try {
    // Send Pageview for Map
    myTracker.pageView({
      GA: true,
      Piwik: true
    }, {
      1: author,
      2: section,
      3: channel,
      5: article_id
    }, url, removehash(window.location.href).replace(window.location.origin,''));
    console.log("Map PV - custom urlfired: " + url);

    // Send Pageview for article
    myTracker.pageView({
      GA: true,
      Piwik: false
    }, {
      1: author,
      2: section,
      3: channel,
      5: article_id
    }, "https://hk01.com/"+page_path, page_path);
    console.log("Article PV - custom url fired: " + url);
  }
  catch(err) {
      console.log(err.message);
  }
  
}

function fire_events(cat, act, lab) {
  try {
    console.log("event fired: ");
    console.log(cat, act, lab);
    myTracker.fire(
      {
        GA: true,
        Piwik: true
      },
      {
        category: cat,
        action: act,
        label: JSON.stringify(lab),
        nonInteraction: false,
        customDimensions: {
          //[DIMENSION_ARTICLE_AUTHOR]: "Eric"
        }
      }
    );
  }
  catch(err) {
      console.log(err.message);
  }
}
