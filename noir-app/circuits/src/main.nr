use dep::std;

fn main(age : u32, birth_year: Field , hash : pub Field) {
    assert(2023 - age == birth_year as u32);
    assert(age >= 18);
    assert(age <= 32);
    // Check integrity of birth year hash
    let computed_hash = std::hash::pedersen([birth_year]);
    assert( hash == computed_hash[0]);
}

#[test]
fn test_main() {
    let birth_hash = std::hash::pedersen([1998]);
    std::println(birth_hash);
    main(25, 1998, birth_hash[0]);
}
