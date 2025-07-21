
export interface Passenger
{
    name: string;
    children?: string[];
}

const passenger1: Passenger =
{
    name: "Maxter",
}

const passenger2: Passenger =
{
    name: "Melissa",
    children: [ "Natalia", "Elizabeth" ]
}

const returnChildrenNumber = ( passenger: Passenger ) => 
{
    if ( !passenger.children ) return 0;

    const howManyChildren = passenger.children?.length || 0;
    // const howManyChildren = passenger.children!.length;

    console.log( passenger.name, howManyChildren );

    return howManyChildren;
}

returnChildrenNumber( passenger1 );