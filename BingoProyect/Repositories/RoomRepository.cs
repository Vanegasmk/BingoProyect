using BingoProyect.Models;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using GraphQL.Types;
using System;
using System.Security.Cryptography;
using System.Text;

namespace BingoProyect.Repositories
{
    class RoomRepository
    {
        private readonly DataBaseContext _context;
        public RoomRepository(DataBaseContext context)
        {
            _context = context;
        }

        public IEnumerable<Room> All(ResolveFieldContext<object> context){
            var results = from rooms in _context.Rooms select rooms;

            if (context.HasArgument("name"))
            {
                var value = context.GetArgument<string>("name");
                results = results.Where(a => a.Name.Contains(value));
            }

            return results;
        }

        public async Task<Room> Add(Room room) {
            _context.Rooms.Add(room);
            await _context.SaveChangesAsync();
            return room; 
        }

        public Cardboard FindCardboard(long id)
        {
            return _context.Cardboards.Find(id);
        }
        
        public async Task<Cardboard> AddCardboard()
        {
            Cardboard cardboard = new Cardboard();
            cardboard.Numbers = new int[5];
            var random = new Random();
            HashSet<int> numbers = new HashSet<int>();
            while (numbers.Count < 25)
            {
                numbers.Add(random.Next(1,49));
            }
            cardboard.Numbers = System.Linq.Enumerable.ToArray(numbers);
            _context.Cardboards.Add(cardboard);
            await _context.SaveChangesAsync();
            return cardboard;
        }

         public async Task<Room> Remove(long id) {
            var room = await _context.Rooms.FindAsync(id);
            if (room == null)
            {
                return null;
            }
            _context.Rooms.Remove(room);
            await _context.SaveChangesAsync();
            return room;
        }
    }
}