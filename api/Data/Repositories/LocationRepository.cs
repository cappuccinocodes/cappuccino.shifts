using System;
using System.Collections.Generic;
using System.Linq;
using api.Data;
using api.Data.Repositories;
using api.Entities;
using Microsoft.EntityFrameworkCore;

namespace api.Data.Repositories
{
    public class LocationRepository: ILocationRepository, IDisposable
    {
        private readonly DataContext _context;

        public LocationRepository(DataContext context )
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }


        public IEnumerable<Location> GetLocations()
        {

            return _context.LocationsPortfolio
            .Include(c => c.Shifts)
            .OrderBy(s => s.Id)
            .ToList();
        }

         public Location GetLocation(int LocationId)
        {
            return _context.LocationsPortfolio.FirstOrDefault(c => c.Id == LocationId);
        }

        public void AddLocation(Location Location)
        {
            if (Location == null)
            {
                throw new ArgumentNullException(nameof(Location));
            }

            _context.LocationsPortfolio.Add(Location);
        }

        public void DeleteLocation(Location Location)
        {
            _context.LocationsPortfolio.Remove(Location);
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
               // dispose resources when needed
            }
        }

        public bool Save()
        {
            return (_context.SaveChanges() >= 0);
        }
    
    }
}