
:> Active navlink for active tab...
:> Page Transition, Skeleton on Card...
:> On Update Event Photo, or Delete event , image delte from upload folder,
:> Base URL come with prefix in image upload url...
:> Table Export ma Kai event na participants, ke volunteers aya ee nai dekhatu
	(means voluteers but kai events na volutneers).
:> Event Completed for Particpants, Volunteers Membered on Expired event...
	(Event Cancel ho jaye to Event Completed nahi hona chahiye...)
:> Remove from event participant request...
:> How many time this event is regenerated... and wich name is already take on regenerate...
:> Generate EventRecept...
:> Add event-Manager sign... for Certificate... :> Make Certificate with proper sign authority...
:> Winner-Certificate
:> Poster for Event...
:> Online Payment Gateway for Paid Events...
:> Request button for particpant remove from event means contact to eventmanager- he/she is remove you 
:> After fullfill the capacity noOne can apply for participate & volunteers...

// :> Certificate Print btn ma locho and Certificate ma be page batave 6e...

// :> Event Cancel button & Nortification to all Participants, and Volunteers...
// :> Export List of all tables in xml format...

// :> Server side filter by ajax and got only name of event and find that event by jquery in html...
// date input style badlvi or label for date.....
// free vali event ma ye dekhy popup box...
// ee kjjjj date participate karelu ke nia..
// captical smalll.... event name unniqk akfva
// event particpate button andar baki hai....
// volunteer same date event conflicats...
// :> Reminder/Alert same date event participate or make member requrest...
// already particpate on this evnet me konsi date karvayenge?

// :> on _target _blank csrf token change... SOLUTION IS STORE CSRF IN COOKIE...
// :> Block/UnBlock all three account by Admin of Website...
// :> Volunteer Conflict... && Participant conflict...
// :> Add to wishlist buton ni style..
// :> How to Participate in paid event, and free event
// :> Userfriendly url...
// :> Add one Web-Development event.
// :> The data coming on home page with proper filter, and make custom filter for user,
		// :> For Design Make Hoverable Hide/Show Menu...
		// -> Location, input_text
		// -> Name, input_text
		// -> Free, checkbox
		// -> Paid, checkbox
		// -> Expire, checkbox
		// -> Certificate YES checkbox
		// -> Winner YES checkbox
		// -> Between date range filter... range
// :> if Volunteer is member of event & Student is Participated & Completed event then he/she post the feedback
// :> Put Confirmation popup in Certificate to all
// :> Event-Manager can post feedback on any other event which is not his/her.
// :> 404 Page...
// :> On add_event page replace Location/Plateform insted of Location...


// :> Event na name pella serach karva padshe ene...

// :> For event unique name if organizer already serach first then make new name of event...
// :> * from compulsury field...
// :> Wishlist button par tooltil or Title make...
// :> Same event name lakhatani sathe warning...







// ----------------------------------------------------------------------------------
//					Last solve or Can't be sloved by me....
// ----------------------------------------------------------------------------------

// :> User can't get certificate if he don't paid money for event.
// :> Complete button after success/not_successfully attend the event, then give feedback.
// :> Realtime...


// -----------------------------------------------------------------------------------------------------------------


//-----------------------------------------------
//		Today Problems
//-----------------------------------------------
	// :> Noritfication realtime baki hai
	// :> Realtime feedback
	// :> Add Event by realtime,

	// :> Make SPA for certificates to all...
	// :> Filter Exipre,  Recently,  Certificate, Free, paid, Wishlist
	// :> Generate Recept
	// :> CSRF token problem after adding 404 Page

	// this portion is done by Admin....
	// :> Event Delete (Delete Cancel),
	// :> if Do then participants, volunteers, feedbacks, wishlist all this four things will be deleted,
	// :> Same time on another event try to participate or be member then push the nortification...

//-----------------------------------------------
//		Simple Problem
//-----------------------------------------------
// :> Data coming with filter on Homepage...
// :> Home Page Slider
// :> Winner Certificate...
// :> Show dilouge box for participate in Free/Paid event
// :> Paganiation on Home page...,
// :> Query String Filter api,
// :> Generate a receipt,
// :> Searchbar on Home Page...,
// :> Put Enrollment Number for more details,
// :> Request or Contact to Website Admin

// ------------------------------------------------------
//			Validation & Idea's
// ------------------------------------------------------
// :> Error message must be Userfriendly,
// :> Show Proper Error by bootstrap alert,
// :> On Add, Delete Confirmation,
// :> Put Validation according to CRUD opertation
// this is done by the compelete button after event end...
// :> Event thay pan 6eke nai
	// Ketla manaso avya
	// ketla e pariticipate karu
	// ketla e volunteer requst muki 
	// ketla voluntter 6e
	// ketla e event compelete keri
	// so for that not to delete all data


//-----------------------------------------------
//		Event Add, Update 
//-----------------------------------------------
// :> Onclick next button Part one Validation,


// :> Event Name unique so that's why on regenerate'
// Problem one:1 update old event (if update then this data removed from event managers, and it is hurts for volunteers,and participants because in their account event wil be shown as new)
// Problem two:2 add old event as new means new event id generated and all problem solve but event name must be unique so what to do(aur ek event jo past me ho chuki hai vo future me vapas honi chahiye).
// ans is Make composite primary key...

// we will do it...
// :> On Same event not participated further put validation on backedside.
// :> On Same event not volunteer further put validation on backedside.


//-----------------------------------------------
//		Web Security
//-----------------------------------------------
// :> OTP Session ko Manipulate karnge,
// :> Session lost on Server close,
:> Regenerate SESSSION, Refresh Token,
// :> CSRF Security, 
   XSS, 
	:> Convert html tags into a special character... (HTML Senetize...)
	:> Sensitive information don't pass into views...'
   SESSION Hijecking,
   Brute Force Attack... (express-brute),
   Helmet module for HTTP Security.


//-----------------------------------------------
//		Socket io and Noritification
//-----------------------------------------------
// :> winner
// :> certificate

// :> participate
// 	-> home page Emit...
// 	-> event Emit...
// 	-> my_events Listen...
// 	-> participants Listen...

// :> be_member_request
// 	-> home_page Emit...
// 	-> event Emit...
// 	-> my_events Listen...
// 	-> volunteers Listen...

// :> accept, reject, remove
// 	-> volunteers Emit...
// 	-> home_page Listen...
// 	-> event Listen...

// :> feedback
// 	-> event Emitbroadcast...
// 	-> my_events Listen...
// 	-> feedback Listen...

// :> add_event, 
// 	-> add_event Emit...
// 	-> Home Listen...

// :> update_event,
// 	-> update_event Emit...
// 	-> Home Listen...(only noritificateion)

// :> Only give Feedback into event and Nortifed about that Event if he/she Participated in Event


// ------------------------------------------------------
//			Big Problem
// ------------------------------------------------------
// :> Certificate_to_User ----> Download -----> No_Certificate_to_User,
// :> Capacity for Participants, Volunteers, (after fullfill ment no one can do any action all things will disable),
// :> On click complete button use can give feedback, (after event expire).
// :> Can't delete all data because it's usefull for past activity
// :> Volunteer can see other volunteers
// :> Data sort by Accept, reject,
// :> Certificate to All (Except Request Field Participants).