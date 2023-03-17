/**
 * SPDX-FileCopyrightText: © 2021 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {FOCUSABLE_ELEMENTS, FocusScope} from '@clayui/shared';
import React, {useEffect, useRef} from 'react';

type Props = {
	/**
	 * Flag to indicate if the focus trap is activated.
	 */
	active: boolean;

	/**
	 * The elements that will receive the focus within the focus trap.
	 */
	children: React.ReactNode;
};

const getFocusableElements = (childrenRef: React.RefObject<HTMLDivElement>) => {
	if (!childrenRef.current) {
		return null;
	}

	return [
		...childrenRef.current.querySelectorAll(FOCUSABLE_ELEMENTS.join(',')),
	].filter((element) => !element.getAttribute('aria-hidden'));
};

export function FocusTrap({active = false, children}: Props) {
	const childrenRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (active) {
			const focusableElements = getFocusableElements(childrenRef);

			if (focusableElements) {
				(focusableElements[0] as HTMLDivElement).focus();
			}
		}
	}, [active]);

	return (
		<FocusScope>
			<div ref={childrenRef}>
				{active ? (
					<span
						aria-hidden="true"
						data-focus-scope-start="true"
						tabIndex={0}
					/>
				) : null}

				{children}

				{active ? (
					<span
						aria-hidden="true"
						data-focus-scope-end="true"
						tabIndex={0}
					/>
				) : null}
			</div>
		</FocusScope>
	);
}
