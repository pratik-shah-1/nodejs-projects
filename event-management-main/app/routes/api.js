const Route = require('express').Router();
const multer = require('multer');
const storage = multer.diskStorage({  	
  	destination: function (req, file, cb) {
        if(file !== undefined)
            cb(null, './public/upload/')
  	},  	
  	filename: function (req, file, cb) {
        if(file !== undefined){
            cb(null, Date.now()+"_"+file.originalname)
        }
  	}
});
const upload = multer({storage:storage});

// CONTROLLERS
const Account = require('../controllers/Account.js');
const Event = require('../controllers/Event.js');
const Participant = require('../controllers/Participant.js');
const Member = require('../controllers/Member.js');
const Wishlist = require('../controllers/Wishlist.js');
const Feedback = require('../controllers/Feedback.js');
const Nortification = require('../controllers/Nortification.js');
const Forgot_Password = require('../controllers/Forgot_Password.js');

const Admin = require('../controllers/admin/Admin.js');
const Event_Category = require('../controllers/admin/Event_Category.js');

// MIDDLEWARE
const CSRF = require('../middleware/CSRF.js');
const Validator = require('../middleware/Validator.js');


Route.post('/filter_event', Event.filter);


// FORM APIS...
// IF DATA IS COMING IN BULK THEN VALIDATE OTHERWISE DON'T
Route.post('/signup', CSRF.check_token, Validator.signup, Account.signup);
Route.post('/login', CSRF.check_token, Validator.login, Account.login);
Route.get('/logout', Account.logout);
Route.put('/profile', CSRF.check_token, Validator.profile, Account.profile);
Route.put('/change_password', CSRF.check_token, Validator.change_password, Account.change_password);
Route.post('/forgot_password/send_otp', CSRF.check_token, Validator.forgot_password, Forgot_Password.send_otp);
Route.post('/forgot_password/check_otp', CSRF.check_token, Forgot_Password.check_otp);
Route.put('/forgot_password/set_new_password', CSRF.check_token, Validator.set_new_password,  Forgot_Password.set_new_password);


Route.get('/check_event_name/:name', Event.check_event_name);
Route.get('/check_event_type/:id', Event.check_event_type);
Route.get('/check_event_date/:id', Event.check_event_date);

Route.post('/event', upload.single('image'), CSRF.check_token, Validator.event, Event.add);
Route.put('/event/:id', upload.single('image'), CSRF.check_token, Validator.event, Event.update);
Route.put('/event_cancel/:id', CSRF.check_token, Event.cancel);

Route.post('/participate', CSRF.check_token, Participant.participate);
Route.post('/member', CSRF.check_token, Member.request);

// :id OF VOLUNTEERS...
Route.put('/member/accept/:event/:id', CSRF.check_token, Member.accept);
Route.put('/member/reject/:event/:id', CSRF.check_token, Member.reject);
Route.delete('/member/remove/:event/:id', CSRF.check_token, Member.remove);

// :id OF STUDENTS...
Route.put('/certificate/:event/:id', CSRF.check_token, Participant.certificate);
Route.put('/no_certificate/:event/:id', CSRF.check_token, Participant.no_certificate);
Route.put('/certificates/:id', CSRF.check_token, Participant.certificates);
Route.put('/no_certificates/:id', CSRF.check_token, Participant.no_certificates);
Route.put('/winner/:event/:id', CSRF.check_token, Participant.winner);
Route.put('/looser/:event/:id', CSRF.check_token, Participant.looser);
Route.delete('/participant/:event/:id', CSRF.check_token, Participant.remove);


Route.post('/wishlist', CSRF.check_token, Wishlist.add); 
Route.delete('/wishlist/:event', CSRF.check_token, Wishlist.remove); 

Route.post('/feedback', CSRF.check_token, Validator.feedback, Feedback.add);
Route.delete('/feedbacks/:event', CSRF.check_token, Feedback.remove_all);

// nid ID NORTIFICATION ID
// pid IS PERSON ID MEANS(VOLUNTEERS, PARTICIPANTS, EVENT-MANAGERS)
Route.delete('/nortification/:nid/:pid', CSRF.check_token, Nortification.remove);

// ADMIN SECTION APIS...
Route.post('/admin/login', CSRF.check_token, Validator.admin_login, Admin.login);
Route.get('/admin/logout', Admin.logout);

// FOR DELETE ACCOUNT OF ALL THREE AND EVENT ALSO...
Route.delete('/event/:id', CSRF.check_token, Admin.delete_event);
Route.delete('/participant/:id', CSRF.check_token, Admin.delete_participant);
Route.delete('/volunteer/:id', CSRF.check_token, Admin.delete_volunteer);
Route.delete('/event_manager/:id', CSRF.check_token, Admin.delete_event_manager);

// FOR BLOCK ACCOUNT OF ALL THREE
Route.put('/participant/:id', CSRF.check_token, Admin.block_participant);
Route.put('/volunteer/:id', CSRF.check_token, Admin.block_volunteer);
Route.put('/event_manager/:id', CSRF.check_token, Admin.block_event_manager);

Route.post('/category', CSRF.check_token, Event_Category.add);
Route.delete('/category/:id', CSRF.check_token, Event_Category.remove);

Route.post('/contact_admin', CSRF.check_token, Admin.contact_admin);
Route.delete('/admin_nortification/:id', CSRF.check_token, Admin.delete_admin_nortification);

module.exports = Route;
