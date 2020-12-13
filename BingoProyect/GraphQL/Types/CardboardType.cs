using GraphQL.Types;
using BingoProyect.Models;
using BingoProyect.Repositories;

namespace  BingoProyect.GraphQL.Types 
{
    class CardboardType : ObjectGraphType<Cardboard>
    {
        public CardboardType()
        {
            Name = "Cardboard";
            Field(x => x.Id).Description("Id of the admin");
            Field(x => x.Numbers).Description("Numbers of cardboard");
        }
    }
}