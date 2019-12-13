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
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampire = 0;
    let currentVampire = this;

    // climb "up" the tree (using iteration), counting nodes, until no boss is found
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampire++;
    }

    return numberOfVampire;

  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {

    let firstVamp = this;
    let secondVamp = vampire;

    let lowestVampire = firstVamp.numberOfVampiresFromOriginal < secondVamp.numberOfVampiresFromOriginal? secondVamp: firstVamp;
    let higherVampire = lowestVampire === firstVamp? secondVamp: firstVamp;

    while(lowestVampire.numberOfVampiresFromOriginal) {
      // Check if whether the two are the same vamp - same branch
      if (lowestVampire.name === higherVampire.name) {
        return lowestVampire;
      }
      // Check if higherVamp is creator of lowerVamp - same branch
      if (lowestVampire.creator && lowestVampire.creator.name === higherVampire.name) {
        return higherVampire;
      } 
      // Check if higherVamp and lowerVamp are siblings
      if (lowestVampire.creator && higherVampire.creator && lowestVampire.creator.name === higherVampire.creator.name) {
        return lowestVampire.creator;
      } 
      lowestVampire = lowestVampire.creator;

      // Keep higherVamp higher than lowestVamp
      if (higherVampire.creator && lowestVampire.numberOfVampiresFromOriginal === higherVampire.numberOfVampiresFromOriginal) {
        higherVampire = higherVampire.creator;
      }
    }
    return undefined;
  }
}

module.exports = Vampire;

