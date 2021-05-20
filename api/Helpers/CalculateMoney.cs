using System;
using api.Helpers;

namespace api.Helpers
{
    public class CalculateMoney
    {
        public static decimal money; 
        public static decimal rate; 
        public static decimal duration; 
        private CalculateDuration calculateDuration = new CalculateDuration();

        public CalculateMoney(){

        }

        public CalculateMoney(decimal rate) {

        }

        public decimal getMoney(decimal duration1, decimal? duration2, decimal? duration3, 
                                decimal penalty1, decimal? penalty2, decimal? penalty3, decimal rate) {
            if (penalty1 == 0) {
                penalty1 = 1;
            }

            if (penalty2 == 0) {
                penalty2 = 1;
            }

            if (penalty3 == 0) {
                penalty3 = 1;
            }
            decimal money1 = duration1 * rate * penalty1; 
            decimal? money2 = duration2 * rate * penalty2; 
            decimal? money3 = duration3 * rate * penalty3; 
            money = money1 + (decimal)money2 + (decimal)money3; 

            Console.WriteLine("I'm 1x = " + money1);
            Console.WriteLine("I'm 2x = " + money2);
            return money; 
        }
    }
}