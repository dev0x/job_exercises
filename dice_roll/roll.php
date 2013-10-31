<?php
namespace phpTest;
/**
 *  roll.php Dice Roller test
 *  This file contains both of the classes to complete the PHP test
 *  @author Matt Racine <matt@mattracine.com>
 *  @version 0.0.1
 *  @package phpTest
 */

//error_reporting(E_STRICT|E_ALL); //setting error reporting

/** 
 * Dice_Roller - Class
 * Class that simulates the rolling of X number of dice with Y number
 * of sides.  This will tally up the dice value of what random
 * value each die could produce. Requires input from the user 
 * to enter X and Y in the form of {digit}d{digit}
 */
class Dice_Roller{
  /**
   * user input from the console
   * @var string
   */
  public $user_input = null;
  /**
   * output to be displayed if it gets set to something
   * @var string
   */
  public $output = null;
  /**
   * number of dice
   * @var integer
   */
  public $num_of_dice = null;  
  /**
   * number of sides that a die can have
   * @var integer
   */
  public $num_of_sides = null;  
  /**
   * array of dice throws
   * @var array
   */
  private $dice_throws = array();

  /**
   * Return boolean based on whether the user input is valid or not 
   * @param string $input user input
   * @return boolean
   */
  private function validate($input){
    $digits = explode('d', $input);
    $number_of_elements = count($digits);
    if($number_of_elements != 2) {
      return false;
    }
    for($i = 0; $i < $number_of_elements; $i++){
      // Check for greater than 0 also not a string
      if ($digits[$i] < 1){
        return false;
      }else if (strpos($digits[$i], ".")){ // Check for Decimals
        return false;
      }    
    }
    return true;  
  }
  /**
   * Constructor sets up Dice_Roller variables and throws dice
   * @param string the user input
   */
  public function __construct($param) {
    if(!$this->validate($param)){
      $this->output = "Input needs to be in the form of {digit}d{digit}";
    } else {
      $digits = explode('d', $param);
      $this->num_of_dice = $digits[0];
      $this->num_of_sides = $digits[1];
      if($this->num_of_sides == 1){
        $this->output = "Har har, a 1 sided Dice is just a sphere.";
      }
      $this->throw_dice();
    }
  } 
  
  /**
   * Returns nothing, takes in nothing.
   * based on the number of dice in Dice_Roller, creates new Dice objects 
   * and pushes the new dice object onto the $dice_throws array
   */
  private function throw_dice(){
    for($i = 0; $i < $this->num_of_dice; $i++){
      $die = new Dice($this->num_of_sides);
      array_push($this->dice_throws, $die);
    }
  }
  /**
   * Returns the score of dice throws or further output
   * Takes in no parameters
   * @return String Score
   */
  public function score_dice_throws(){
    if (!is_null($this->output) ){
      return $this->output;
    }
    $score = 0;
    foreach($this->dice_throws as $dice){
      $score += $dice->get_value();
    }
    return $score;
  }

}
/**
 * @package phpTest
 * Dice object.  
 * Number of sides and value of die
 */
class Dice{
  /**
   * number of sides
   * @var integer
   */
  private $sides = null;
  /**
   * value of die
   * @var integer
   */
  private $dice_value = null;

  /**
   * Constructor, takes in number of sides and sets the number of sides and rolls the die
   * @param integer number of sides
   */
  public function __construct($num_of_sides){
    $this->set_sides($num_of_sides);  
    $this->roll();
  }
  /**
   * Sets number of sides 
   * @param integer number of sides
   */
  public function set_sides($num){
      $this->sides = $num;
  }
  /**
   * Returns the number of sides of die
   * @return integer 
   */
  public function get_sides(){
    return $this->sides;
  }
  /**
   * Returns the value of die
   * @return integer
   */
  public function get_value(){
    return $this->dice_value;
  }
  /**
   * Takes in nothing and returns nothing but assigns the value of the die with a random number from 1 to the number of sides
   */
  public function roll(){
    $this->dice_value = rand(1, $this->sides);
  }
}
//The following is creation of the Dice_Roller and then echoing out the score
$game = new Dice_Roller($argv[1]);
echo $game->score_dice_throws();
?>

