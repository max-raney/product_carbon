from dataclasses import dataclass
from typing import List

@dataclass
class company_data:
    company: str
    brands: List[str]
    total_emissions: int
    gross_revenue: int # in billions
    epd: int # emissions per dollar

# return a company_data object for company
def fetch_company_data(company):
    # TODO: replace with actual lookup
    data = company_data(company=company, total_emissions=71270000, gross_revenue=574.78, brands=[company], epd=calculate_epd(71270000, 574.78))
    return data

# takes total emissions in MT CO2e and revenue in billions/year
def calculate_epd(total_emissions, gross_revenue):
    epd = total_emissions / gross_revenue / 1000000
    return epd



def main():
    prod_1 = 10
    prod_2 = 20

    amazon = fetch_company_data("amazon")

    prod_1_emissions = prod_1 * amazon.epd
    prod_2_emissions = prod_2 * amazon.epd

    print(f"product 1 is ${prod_1} and contributes to {prod_1_emissions} kg of Amazon's emissions")
    print(f"product 2 is ${prod_2} and contributes to {prod_2_emissions} kg of Amazon's emissions")

if __name__ == "__main__":
    main()