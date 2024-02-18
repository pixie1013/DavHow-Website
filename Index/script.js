window.onscroll = function() {myFunction()};
var header = document.getElementById("navBar");
var sticky = header.offsetTop;

function myFunction() {
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    } 
    else {
        header.classList.remove("sticky");
    }
}

var documentsToggle = document.querySelector('#documents-toggle');
var documentsSubmenu = document.querySelector('#documents-sub-menu');
var documentsIconToggle = document.querySelector('#documents-icon-toggle');

var validIdsToggle = document.querySelector('#valid-ids-toggle');
var validIdsSubmenu = document.querySelector('#valid-ids-sub-menu');
var validIdsIconToggle = document.querySelector('#valid-ids-icon-toggle');

var subItems = document.querySelectorAll('.sub-menu .sub-item');

documentsToggle.addEventListener('click', function (event) {
event.preventDefault();
toggleSubmenu(documentsSubmenu, documentsIconToggle);
});

validIdsToggle.addEventListener('click', function (event) {
event.preventDefault();
toggleSubmenu(validIdsSubmenu, validIdsIconToggle);
});

function toggleSubmenu(submenu, icon) {
submenu.style.display = (submenu.style.display === 'block' ? 'none' : 'block');
icon.classList.toggle('rotate-down');
}

function submitComment() {
const name = document.getElementById('comment-name').value;
const text = document.getElementById('comment-text').value;

if (name && text) {
const commentList = document.getElementById('comments-list');

// Create a new comment element
const commentElement = document.createElement('div');
commentElement.className = 'comment';
commentElement.innerHTML = `<strong>${name}:</strong> ${text}`;

// Append the new comment to the comments list
commentList.appendChild(commentElement);

// Clear the comment form
document.getElementById('comment-name').value = '';
document.getElementById('comment-text').value = '';
}
}

let currentSlide = 0;

function showSlide(index) {
    const slider = document.getElementById('slider');
    const slides = document.querySelectorAll('.slider img');

    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }

    const translateValue = -currentSlide * 100 + '%';
    slider.style.transform = 'translateX(' + translateValue + ')';
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

const data = {
currentUser: {
image: {
png: "https://images.freeimg.net/thumbs/profile-2398782_1280.png",
webp: "https://images.freeimg.net/thumbs/profile-2398782_1280.png",
},
username: "trixie123",
},
comments: [
{
parent: 0,
id: 1,
content:
"Thank you for this information!",
createdAt: "5 years ago",
user: {
image: {
png: "https://creazilla-store.fra1.digitaloceanspaces.com/icons/3205460/person-circle-icon-md.png",
webp: "https://creazilla-store.fra1.digitaloceanspaces.com/icons/3205460/person-circle-icon-md.png",
},
username: "anon123",
},
replies: [],
},
{
parent: 0,
id: 2,
content:
"This is very helpful, may I ask if I can pay for a courier to deliver the document?",
createdAt: "2 years ago",
user: {
image: {
png: "https://www.svgrepo.com/show/408476/user-person-profile-block-account-circle.svg",
webp: "https://www.svgrepo.com/show/408476/user-person-profile-block-account-circle.svg",
},
username: "roslyn123",
},
replies: [
{
parent: 2,
id: 1,
content:
"Of course you can!",
createdAt: "2 years ago",
replyingTo: "roslyn123",
user: {
image: {
  png: "https://static-00.iconduck.com/assets.00/profile-major-icon-512x512-xosjbbdq.png",
  webp: "https://static-00.iconduck.com/assets.00/profile-major-icon-512x512-xosjbbdq.png",
},
username: "apple123",
},
},
{
parent: 2,
id: 1,
content:
"Thank you!",
createdAt: "1 year ago",
replyingTo: "apple123",
user: {
image: {
  png: "https://www.svgrepo.com/show/408476/user-person-profile-block-account-circle.svg",
  webp: "https://www.svgrepo.com/show/408476/user-person-profile-block-account-circle.svg",
},
username: "roslyn123",
},
},
],
},
],
};
function appendFrag(frag, parent) {
var children = [].slice.call(frag.childNodes, 0);
parent.appendChild(frag);
//console.log(children);
return children[1];
}

const addComment = (body, parentId, replyTo = undefined) => {
let commentParent =
parentId === 0
? data.comments
: data.comments.filter((c) => c.id == parentId)[0].replies;
let newComment = {
parent: parentId,
id:
commentParent.length == 0
? 1
: commentParent[commentParent.length - 1].id + 1,
content: body,
createdAt: "Now",
replyingTo: replyTo,
replies: parent == 0 ? [] : undefined,
user: data.currentUser,
};
commentParent.push(newComment);
initComments();
};
const deleteComment = (commentObject) => {
if (commentObject.parent == 0) {
data.comments = data.comments.filter((e) => e != commentObject);
} else {
data.comments.filter((e) => e.id === commentObject.parent)[0].replies =
data.comments
.filter((e) => e.id === commentObject.parent)[0]
.replies.filter((e) => e != commentObject);
}
initComments();
};

const promptDel = (commentObject) => {
const modalWrp = document.querySelector(".modal-wrp");
modalWrp.classList.remove("invisible");
modalWrp.querySelector("#yes").addEventListener("click", () => {
deleteComment(commentObject);
modalWrp.classList.add("invisible");
});
modalWrp.querySelector("#no").addEventListener("click", () => {
modalWrp.classList.add("invisible");
});
};

const spawnReplyInput = (parent, parentId, replyTo = undefined) => {
if (parent.querySelectorAll(".reply-input")) {
parent.querySelectorAll(".reply-input").forEach((e) => {
e.remove();
});
}
const inputTemplate = document.querySelector(".reply-input-template");
const inputNode = inputTemplate.content.cloneNode(true);
const addedInput = appendFrag(inputNode, parent);
addedInput.querySelector(".bu-primary").addEventListener("click", () => {
let commentBody = addedInput.querySelector(".cmnt-input").value;
if (commentBody.length == 0) return;
addComment(commentBody, parentId, replyTo);
});
};

const createCommentNode = (commentObject) => {
const commentTemplate = document.querySelector(".comment-template");
var commentNode = commentTemplate.content.cloneNode(true);
commentNode.querySelector(".usr-name").textContent =
commentObject.user.username;
commentNode.querySelector(".usr-img").src = commentObject.user.image.webp;
commentNode.querySelector(".cmnt-at").textContent = commentObject.createdAt;
commentNode.querySelector(".c-body").textContent = commentObject.content;
if (commentObject.replyingTo)
commentNode.querySelector(".reply-to").textContent =
"@" + commentObject.replyingTo;

if (commentObject.user.username == data.currentUser.username) {
commentNode.querySelector(".comment").classList.add("this-user");
commentNode.querySelector(".delete").addEventListener("click", () => {
promptDel(commentObject);
});
commentNode.querySelector(".edit").addEventListener("click", (e) => {
const path = e.path[3].querySelector(".c-body");
if (
path.getAttribute("contenteditable") == false ||
path.getAttribute("contenteditable") == null
) {
path.setAttribute("contenteditable", true);
path.focus()
} else {
path.removeAttribute("contenteditable");
}

});
return commentNode;
}
return commentNode;
};

const appendComment = (parentNode, commentNode, parentId) => {
const bu_reply = commentNode.querySelector(".reply");
// parentNode.appendChild(commentNode);
const appendedCmnt = appendFrag(commentNode, parentNode);
const replyTo = appendedCmnt.querySelector(".usr-name").textContent;
bu_reply.addEventListener("click", () => {
if (parentNode.classList.contains("replies")) {
spawnReplyInput(parentNode, parentId, replyTo);
} else {
//console.log(appendedCmnt.querySelector(".replies"));
spawnReplyInput(
appendedCmnt.querySelector(".replies"),
parentId,
replyTo
);
}
});
};

function initComments(
commentList = data.comments,
parent = document.querySelector(".comments-wrp")
) {
parent.innerHTML = "";
commentList.forEach((element) => {
var parentId = element.parent == 0 ? element.id : element.parent;
const comment_node = createCommentNode(element);
if (element.replies && element.replies.length > 0) {
initComments(element.replies, comment_node.querySelector(".replies"));
}
appendComment(parent, comment_node, parentId);
});
}

initComments();
const cmntInput = document.querySelector(".reply-input");
cmntInput.querySelector(".bu-primary").addEventListener("click", () => {
let commentBody = cmntInput.querySelector(".cmnt-input").value;
if (commentBody.length == 0) return;
addComment(commentBody, 0);
cmntInput.querySelector(".cmnt-input").value = "";
});

document.addEventListener("DOMContentLoaded", function () {
//Get the button
var mybutton = document.getElementById("scrollToTopBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", function () {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
});
});