using GraphQL.Types;
using BingoProyect.Models;

namespace  BingoProyect.GraphQL.Types 
{
    class AdminInputType : InputObjectGraphType
    {
        public AdminInputType()
        {
            Name = "AdminInputType";
            Field<NonNullGraphType<StringGraphType>>("email");
            Field<NonNullGraphType<StringGraphType>>("password");
        }
    }
}