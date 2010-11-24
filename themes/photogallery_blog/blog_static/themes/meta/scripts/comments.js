/*
The hide/show code is based on an example from the article "Unobtrusive show/hide behavior reloaded" by Bobby van der Sluis
URL: http://www.bobbyvandersluis.com/articles/unobtrusiveshowhide.php
*/
if (document.getElementById) {
  if (mtGetCookie('showcomments') != 1) {
    document.write('<link rel="stylesheet" type="text/css" href="' + blogrelurl + 'themes/meta/css/comments-hide.css" />');
  } else {
    document.write('<link rel="stylesheet" type="text/css" href="' + blogrelurl + 'themes/meta/css/comments-show.css" />');
  }
  window.onload = initCommentState;
}

// Hide all toggleable sections with JavaScript for the highly improbable case that CSS is disabled
// Note that in this case the 'flash of visible content' still will occur
function initCommentState() {
  var showBtn = document.getElementById('showcomments');
  var hideBtn = document.getElementById('hidecomments');
  if ((showBtn) && (hideBtn)) {
    if (mtGetCookie('showcomments') != 1) {
      document.getElementById('comments').style.display = 'none';
      document.getElementById('hidecomments').style.display = 'none';
      document.getElementById('showcomments').style.display = 'inline';
    } else {
      document.getElementById('showcomments').style.display = 'none';
      document.getElementById('hidecomments').style.display = 'inline';
    }
    showBtn.onclick = function() {
      showComments();
      return false;
    }
    hideBtn.onclick = function() {
      hideComments();
      return false;
    }
  }

  var addComment = document.getElementById('addcomment');
  var addCommentButton = document.getElementById('addcommentbutton');
  var commenter_name;

  addComment.style.display = 'none';
  addCommentButton.style.display = 'block';
  addCommentButton.onclick = function() {
    addComment.style.display = 'block';
    addCommentButton.style.display = 'none';
  }

  if (commenter_name) {
    document.getElementById('row-email').style.display = 'none';
    document.getElementById('row-name').style.display = 'none';
  }
}

function hideComments() {
  var now = createExpires();
  document.getElementById('comments').style.display = 'none';
  document.getElementById('showcomments').style.display = 'inline';
  document.getElementById('hidecomments').style.display = 'none';
  mtSetCookie('showcomments', 0, now, '/', '', '');
}

function showComments() {
  var now = createExpires();
  document.getElementById('comments').style.display = 'block';
  document.getElementById('showcomments').style.display = 'none';
  document.getElementById('hidecomments').style.display = 'inline';
  mtSetCookie('showcomments', 1, now, '/', '', '');
}

function createExpires() {
  var now = new Date();
  mtFixDate(now);
  now.setTime(now.getTime() + 365 * 24 * 60 * 60 * 1000);
  return now;
}
