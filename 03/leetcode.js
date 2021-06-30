/*01..Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.*/

var twoSum = function(nums, target) {
    let arr = []    
    for(let i = 0; i<nums.length;i++){        
        let needle = target - nums[i]        
        if(arr[needle]!=undefined){
            return [arr[needle], i]                        
        }
        arr[nums[i]] = i
    }    
};

nums = [2,7,11,15]
target = 9
//console.log(twoSum(nums, target))



/*07..Given a signed 32-bit integer x, return x with its digits reversed. 
If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.*/ 

var reverse = function(x) {
    let num = parseFloat(x.toString().split("").reverse().join(""))*Math.sign(x)
    if(num > Math.pow(2, 31)-1 || num < Math.pow(-2, 31)){
        return 0
    }    
    return num
};

//console.log(reverse(-2147483648))

/* 09..Given an integer x, return true if x is palindrome integer.

An integer is a palindrome when it reads the same backward as forward. For example, 121 is palindrome while 123 is not. */

var isPalindrome = function(x) {
    let num = x.toString()  
    let numrev = num.split("").reverse().join("")
    if(num == numrev){
        return true
    }
    return false   
};

//console.log(isPalindrome(10))

/* 13..Roman numerals are usually written largest to smallest from left to right. However, 
the numeral for four is not IIII. Instead, the number four is written as IV. 
Because the one is before the five we subtract it making four. The same principle 
applies to the number nine, which is written as IX. There are six instances where subtraction is used:

I can be placed before V (5) and X (10) to make 4 and 9. 
X can be placed before L (50) and C (100) to make 40 and 90. 
C can be placed before D (500) and M (1000) to make 400 and 900.
Given a roman numeral, convert it to an integer.

 */

var romanToInt = function(s) {
    var arr = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    }
    let result = 0

    for(let i=0; i<s.length; i++){
        if(arr[s[i]] < arr[s[i+1]]){
            result += arr[s[i+1]] - arr[s[i]]
            i++
        }else{
            result += arr[s[i]]
        }        
    }
    return result        
};

//console.log(romanToInt("LVIII"))

/*14..Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string "". */

/*
 * @param {string[]} strs
 * @return {string}
 */
 var longestCommonPrefix = function(strs) {
    
};

var longestCommonPrefix = function(array){
    if ( array === undefined || array.length === 0) {
        return ""
     }   
     A = array.sort()
     a = A[0], b = A[A.length - 1]
     var i = 0
     while ( i < a.length && a.charAt(i) == b.charAt(i)) i++ 
     return a.substring(0,i)
 }

 /*20..Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order. */


 var isValid = function(s) {
    if(s=== null || s.length <= 0) return true
    let stack = []
    
    for(let i = 0; i<s.length; i++){
        if(s.charAt(i) ==='[') stack.push(']')
        else if(s.charAt(i) === '{') stack.push('}')
        else if(s.charAt(i) === '(') stack.push(')')
        else if(stack.length === 0 || s.charAt(i) !== stack.pop()) return false
    }
    return stack.length === 0 
};

var removeElement = function(nums, val) {
    let cosa = nums.filter(x => x != val)
    return cosa
};

console.log(removeElement([3,2,2,3], 3))