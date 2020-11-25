using GraphQL.Types;
using BingoProyect.Models;
using BingoProyect.Repositories;

namespace  BingoProyect.GraphQL.Types 
{
    class RoomType : ObjectGraphType<Room>
    {
        public RoomType()
        {
            Name = "Room";
            Field(x => x.Id).Description("Id of the room");
            Field(x => x.Name).Description("Name of the room");
            Field(x => x.Code).Description("Code of the room");
        }
    }
}