using System;
using System.Collections.Generic;
using System.Globalization;

namespace api.Helpers
{
    public class CalculateDuration
    {
        public static TimeSpan durationTimeSpan = new TimeSpan();
        public static DateTime shiftStart = new DateTime();
        public decimal duration;
        public CalculateDuration()
        {

        }

        public CalculateDuration(DateTime start, DateTime end)
        {

        }

        public decimal getDurationDecimal(DateTime start, DateTime end)
        {
            durationTimeSpan = getDurationTimeSpan(start,end);
            string durationString = durationTimeSpan.ToString();
            var parsedDuration = TimeSpan.Parse(durationString, CultureInfo.InvariantCulture).TotalHours;
            duration = Convert.ToDecimal(parsedDuration);
            duration = decimal.Round(duration, 2);
            Console.WriteLine("I'm durationDouble: " + duration);
            return duration;
        }

         public TimeSpan getDurationTimeSpan(DateTime start, DateTime end)
        {
            durationTimeSpan = end - start;
            return durationTimeSpan;
        }

        public TimeSpan getShiftDuration(TimeSpan duration1, TimeSpan? duration2, TimeSpan? duration3) {
            TimeSpan shiftDuration = new TimeSpan();
            shiftDuration = duration1 + (TimeSpan)duration2 + (TimeSpan)duration3; 
            return shiftDuration;
        }

       //calculates start from entire shift from starts of shift parts
        public DateTime calculateStart(DateTime start1, DateTime? start2, DateTime? start3)
        {
            List<DateTime> starts = new List<DateTime>();
            starts.Add(start1);
            starts.Add((DateTime)start2);
            starts.Add((DateTime)start3);

            starts.ForEach(start => Console.WriteLine(start + ", "));

            DateTime shiftStart = DateTime.MaxValue;

            foreach (DateTime start in starts)
            {
                if (start < shiftStart)
                    shiftStart = start;
            }

            Console.WriteLine ("ShiftStart = " + shiftStart);
            return shiftStart;
        }

        public DateTime calculateEnd(DateTime end1, DateTime? end2, DateTime? end3)
        {
            List<DateTime> ends = new List<DateTime>();
            ends.Add(end1);
            ends.Add((DateTime)end2);
            ends.Add((DateTime)end3);

            ends.ForEach(end => Console.WriteLine(end + ", "));

            DateTime shiftEnd = DateTime.MinValue;

            foreach (DateTime end in ends)
            {
                if (end > shiftEnd)
                    shiftEnd = end;
            }

            Console.WriteLine ("ShiftEnd = " + shiftEnd);
            return shiftEnd;
        }
    }
}