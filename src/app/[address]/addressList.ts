export const addressList = {
    evmAddress: '',
};


interface PageProps {
    params: { address: string };
}

function addAddress({ params }: PageProps) {
    addressList.evmAddress = params.address;
}