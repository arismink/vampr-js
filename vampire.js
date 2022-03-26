class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    vampire.creator = this;
    this.offspring.push(vampire);
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numOfVampFromCreator = 0;
    let currVamp = this;

    while (currVamp.creator) {
      numOfVampFromCreator ++;
      currVamp = currVamp.creator;
    }
    return numOfVampFromCreator;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    // the greater the number, the farther you are away from the original
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let thisVamp = this;
    let thatVamp = vampire;

    // check if both vamps are the same
    while (thisVamp !== thatVamp) {

      // if they are not, then are they on the same branch?
      if (thisVamp.numberOfVampiresFromOriginal !== thatVamp.numberOfVampiresFromOriginal) {

        // if they are not the same, find which is lower, and the lower will go up a branch
        if (thisVamp.isMoreSeniorThan(thatVamp)) {
          thatVamp = thatVamp.creator;
        } else {
          thisVamp = thisVamp.creator;
        }
      } else {
        // if they are on the same branch, go up one branch for both
        thisVamp = thisVamp.creator;
        thatVamp = thatVamp.creator;        
      }
      
    }
    return thisVamp;
  }
}

module.exports = Vampire;

  // get all parents of each node
  // start from bottom, compare if the parents at each level are the same, if not 
  // create array of parent nodes for this, and array of parent nodes for that and then compare value at the indexes and check if they exist, if not move out