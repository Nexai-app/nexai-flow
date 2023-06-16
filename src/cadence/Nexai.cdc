pub contract Nexai {

// state
pub var cardId:UInt64
pub var userId:UInt64


//-----------------------------------------
//structs
pub struct ProfileEntry {

    pub var name: String
    pub var email: String


init (_name:String, _email: String) {
    self.name = _name
    self.email = _email
    }
}

pub struct CardEntry {
   pub var email: String
   pub var question : String
   pub var answer: String

    init (_email:String, _question: String, _answer:String) {
    self.email = _email
    self.question = _question
    self.answer = _answer

    }
    
}
//-----------------------------------------




//-----------------------------------------
// Dictionaries
pub var profileModal: {UInt64: ProfileEntry}
pub var cardModal: {UInt64: CardEntry}

//-----------------------------------------




// logic
    //createProfile
    pub fun createProfile(name:String, email:String) {
    //TODO: check if user with that email exists before
    pre {
       // log(self.profileModal.values)
    }


    // add new user into the dictionary
    self.profileModal[self.userId] = ProfileEntry(_name:name, _email:email)

    
    //increase the userId for the next user
    self.userId = self.userId + 1
     }

    pub fun createCard(email:String, question:String, answer:String) {
    //TODO: check if email exists before creating card
    pre {
        
    }
     self.cardModal[self.cardId] = CardEntry(_email:email, _question: question, _answer: answer)

      //increase the cardIdfdor the next card
        self.cardId = self.cardId + 1
     }
    
    
    //login
    //pub fun logIn (email)
    //getAllCompnay
    //created card
    //getAnswer
    //getallcards
    //get acompany profil

init () {
    self.cardId = 1
    self.userId = 1 
    self.profileModal = {}
    self.cardModal = {}
}



}