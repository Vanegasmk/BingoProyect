using GraphQL.Types;
using BingoProyect.Models;

namespace  BingoProyect.GraphQL.Types 
{
    class RoomInputType : InputObjectGraphType
    {
        public RoomInputType()
        {
            Name = "RoomInputType";
            Field<NonNullGraphType<StringGraphType>>("name");
            Field<NonNullGraphType<StringGraphType>>("code");
        }
    }
}