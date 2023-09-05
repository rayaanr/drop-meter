'use client'

import {Input, Select, SelectItem, Avatar, SelectedItems, Button, Card, CardBody, Divider} from "@nextui-org/react";
import {chainData} from "@/app/assets/chainData";
import React, {useState} from "react";
import { useRouter } from "next/navigation";
import {CardFooter, CardHeader} from "@nextui-org/card";

type ChainSelect = {
    id: string;
    name: string;
    avatar: string;
};

type validationState = "valid" | "invalid";

const chains = Object.entries(chainData).map(([key, data]) => ({
    id: data.value, // You can use 'key' as the 'id' if you want unique identifiers
    name: data.name,
    avatar: data.logo,
}));


function SelectionForm() {
    const [address, setAddress] = useState ("")
    const [selectedChain, setSelectedChain] = useState('zksync');
    const [validationState, setValidationState] = useState<validationState>('valid');
    const [error, setError] = useState('');
    const router = useRouter();

    function isValidEthereumAddress(address: string) {
        return /^0x[0-9A-Fa-f]{40}$/.test(address);
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (!address) {
            setValidationState("invalid");
            setError("Address is required");
            return;
        }
        if (!isValidEthereumAddress(address)) {
            setValidationState("invalid");
            setError("Not a valid address");
            return;
        } else {
            router.push(`/${address}/${selectedChain}`);

        }
    };

    return (
        <>
            <main className={'m-5 hello'}>
            <Card isBlurred className={'border-none bg-background/60 dark:bg-default-100/50 '}>
                <CardBody className={'flex gap-4 text-center'}>
                    <Input
                        type="text"
                        label="Address"
                        variant="bordered"
                        validationState={validationState}
                        errorMessage={error}
                        description="We'll never store or share your details with anyone else."
                        onChange={(event) => {setAddress(event.target.value);}}
                    />
                    <Select
                        items={chains}
                        defaultSelectedKeys={["zksync"]}
                        placeholder="Select a network"
                        classNames={{
                            base: "w-52 ml-36 mr-36",
                            trigger: "h-12",
                        }}

                        radius={'full'}
                        size='sm'
                        onChange={(e) => setSelectedChain(e.target.value)}
                        renderValue={(items: SelectedItems<ChainSelect>) => {
                            return items.map((item) => (
                                <div key={item.key} className="flex items-center gap-2">
                                    <Avatar
                                        alt={item.data?.name}
                                        className="flex-shrink-0"
                                        size="sm"
                                        src={item.data?.avatar}
                                    />
                                    <div className="flex flex-col">
                                        <span>{item.data?.name}</span>
                                    </div>
                                </div>
                            ));
                        }}
                    >
                        {(chain) => (
                            <SelectItem key={chain.id} textValue={chain.name}>
                                <div className="flex gap-2 items-center">
                                    <Avatar alt={chain.name} className="flex-shrink-0" size="sm" src={chain.avatar} />
                                    <div className="flex flex-col">
                                        <span className="text-small">{chain.name}</span>
                                    </div>
                                </div>
                            </SelectItem>
                        )}
                    </Select>


                    {/*<CardFooter className={'flex justify-center'}>*/}
                    {/*    */}
                    {/*</CardFooter>*/}

                </CardBody>
            </Card>
            <Button onClick={handleSubmit} className={'m-5 w-1/2'} size="lg" radius="sm" variant="ghost" color="primary">
                View Stats
            </Button>
            </main>
        </>
    );
}

export default SelectionForm;










