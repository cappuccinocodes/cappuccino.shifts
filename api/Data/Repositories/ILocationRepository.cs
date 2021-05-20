using System.Collections.Generic;
using api.Entities;

namespace api.Data.Repositories
{
    public interface ILocationRepository
    {
        IEnumerable<Location> GetLocations();
        Location GetLocation(int locationId);
        void AddLocation(Location location);
        void DeleteLocation(Location location);
        bool Save(); 
    }
}