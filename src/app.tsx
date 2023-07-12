import React from 'react';

import { HeadscaleNode } from './types';
import { Icon } from '@patternfly/react-core';
import ExclamationCircleIcon from '@patternfly/react-icons/dist/esm/icons/exclamation-circle-icon';
import CheckCircleIcon from '@patternfly/react-icons/dist/esm/icons/check-circle-icon';
import InfoCircleIcon from '@patternfly/react-icons/dist/esm/icons/info-circle-icon';
import {
    ExpandableRowContent,
    Table, Caption, Thead, Tbody, Tr, Th, Td,
    SortByDirection,
} from '@patternfly/react-table';

type ApplicationProps = {
}

type ApplicationState = {
    Nodes: HeadscaleNode
}

export class Application extends React.Component<ApplicationProps, ApplicationState> {
    state: ApplicationState = {
        Nodes: null
    }

    constructor(props: ApplicationProps) {
        super(props);

        cockpit
        .spawn(['headscale', 'nodes', 'list', '-o', 'json'])
        .done(content => {
            const nodes: HeadscaleNode = JSON.parse(content)
            this.setState(state => ({ Nodes: nodes }));
        });

    }

    render() {
        return (
            <>
                {
                this.state.Nodes != null
                    ? <Table
                            aria-label="Headscale nodes"
                            variant='compact' borders={false}>
                            <Caption>Headscale nodes</Caption>
                            <Thead>
                                <Tr>
                                    <Th></Th>
                                    <Th>Hostname</Th>
                                    <Th>Name</Th>
                                    <Th>IP addresses</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    Object.values(this.state.Nodes)
                                        .map(node => {
                                            return <Node {...node} />
                                        }
                                    )
                                }
                            </Tbody>
                        </Table>

                    : <p>Loading...</p>
                }
            </>
    )}
}

class Node extends React.Component<HeadscaleNode> {
    render() {

        return (
            <Tr>
                <Td>{this.props.online
                        ? <Icon status="success"><CheckCircleIcon /></Icon>
                        : <Icon status="danger"><ExclamationCircleIcon /></Icon>
                    }</Td>
                <Td>{this.props.name}</Td>
                <Td>{this.props.given_name}</Td>
                <Td>{this.props.ip_addresses[0]}</Td>
            </Tr>);
    }
}